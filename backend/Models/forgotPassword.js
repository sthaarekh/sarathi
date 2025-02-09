import mongoose from "mongoose";
import validator from "validator";
import crypto from "crypto";

const forgotPasswordSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "email already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    // Fields for Reset Password
    resetPasswordToken: {
      type: String,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  { collection: "clubadmins" }
);

// Generate Password Reset Token Method
forgotPasswordSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes expiry

  return resetToken; // Send unencrypted token to email
};

// Static method to check if the reset token has expired
forgotPasswordSchema.statics.isResetTokenExpired = function (resetPasswordExpires) {
  return Date.now() > resetPasswordExpires;
};

const forgotPassword = mongoose.model("forgotpassword", forgotPasswordSchema);
export default forgotPassword;
