import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

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
    adminVerified: {
      type: Boolean,
      default: false,
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

const Clubadmin = mongoose.model("Clubadmin", ClubAdminSchema);
export default Clubadmin;
