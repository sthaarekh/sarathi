import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import * as User from "../Models/clubAdmin.js"; // Include .js extension for ES modules
import { Router } from "express";
const router = express.Router();
const date = new Date().toLocaleString();
dotenv.config({ path: "../.env" });

router.get("/verify/:token", async (req, res, next) => {
  const token = req.params.token;
  if (!token) {
    return new Error({ message: "Token not found" });
  }
  try {
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userId = decode.userId;

    await User.updateOne({ _id: userId }, { $set: { emailVerified: true } });
    return res.status(201).json({
      status: "success",
      modifiedAt: date,
      message: "Successfully verified your email",
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({
        message:
          "The token has expired. Please request a new verification email.",
      });
    }

    return res.json({
      message: `couldnot verify the email:${error.name}`,
    });
  }
});

export default router; // ES Module syntax
