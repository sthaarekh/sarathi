import express from "express";
import HttpError from "../Models/HttpError.js";
import * as Clubadmin from "../Models/clubAdmin.js";
import jwt from "jsonwebtoken";
import * as sendEmail from "../utils/EmailSender.js";
import bcrypt from "bcrypt";
import fs from "fs";
import uploadToCloudinary from "../utils/cloudinaryUploader.js";

const date = new Date().toLocaleDateString();

// Signup Feature for club admin
export const SignUp = async (req, res, next) => {
  try {
    const { username, email, password, passwordConfirm } = req.body;

    const newClubadmin = await Clubadmin.create({
      username,
      email,
      password,
      passwordConfirm,
    });

    const token = jwt.sign(
      { userId: newClubadmin._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    try {
      await sendEmail(email, token);

      res.status(201).json({
        status: "success",
        timestamp: date,
        data: {
          newClubadmin,
        },
        message: `A verification link has been sent to ${email}. Please click on the link to verify your email.`,
      });
    } catch (emailError) {
      console.error("Error sending verification email:", emailError);
      return next(
        new HttpError(
          500,
          `Error sending verification email: ${emailError.message}`
        )
      );
    }
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        status: "fail",
        message: error.message,
      });
    } else if (error.code === 11000) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });
    }

    return next(
      new HttpError(500, `An error occurred on the server: ${error.message}`)
    );
  }
};
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await Clubadmin.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "User is not registered yet",
        user,
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch && user.emailVerified) {
      return res.status(200).json({
        status: "success",
        date: date,
        message: "Logged in!!",
      });
    } else if (isMatch && !user.emailVerified) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      await sendEmail(user.email, token);
      return res.status(200).json({
        status: "success",
        message:
          "An email has been sent once again please click  on that to verify your email",
      });
    } else {
      return res.status(401).json({
        status: "failed",
        message: "Couldnot login with the credintial provided",
      });
    }
  } catch (error) {
    return new HttpError(500, `An error occured :${error}`);
  }
};
export const UploadProfilePic = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        status: "fail",
        message: "Couldnot find the file",
      });
    } else {
      const result = await uploadToCloudinary(req.file);

      fs.unlinkSync(req.file.path);
      res.status(200).json({
        status: "success",
        message: "Successfully uploaded file to cloudinary",
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Failed",
      error: error,
    });
  }
};
