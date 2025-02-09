import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { Club } from "lucide-react";
import crypto from "crypto";

const ClubAdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide your username"],
      unique: [true, "username already exists"],
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: [true, "email already exists"],
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      validate: [
        validator.isStrongPassword,
        "Your password is not strong enough",
      ],
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please enter your password "],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
      },
    },
    emailVerified: {
      type: Boolean,
      default: false,
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

ClubAdminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hashSync(this.password, 3);
    this.passwordConfirm = undefined;
    next();
  } catch (err) {
    return next(err);
  }
});

// Add a pre-validation hook to handle password reset
ClubAdminSchema.pre("validate", function (next) {
  if (this.isModified("password") && !this.isNew) {
    this.passwordConfirm = this.password;
  }
  next();
});

// Generate Password Reset Token Method
ClubAdminSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpires = Date.now() + 100 * 60 * 1000; // 10 minutes expiry

  return resetToken; // Send unencrypted token to email
};

// Static method to check if the reset token has expired
ClubAdminSchema.statics.isResetTokenExpired = function (resetPasswordExpires) {

  return Date.now() > resetPasswordExpires;
};
const Clubadmin = mongoose.model("Clubadmin", ClubAdminSchema);
export default Clubadmin;
