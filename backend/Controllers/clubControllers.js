import express from "express";
import HttpError from "../Models/HttpError.js";
import Clubadmin from "../Models/clubAdmin.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/EmailSender.js";
import bcrypt from "bcrypt";
import fs, { stat } from "fs";
import cloudinary from "../config/cloudinary.js";
import Club from "../Models/clubs.js";
import mongoose from "mongoose";

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
      console.log("inside try");
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
        message: "Username or Email already exists",
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

export const clubDetails = async (req, res, next) => {
  console.log("before try");
  try {
    console.log("Before the request");
    const {
      name,
      department,
      description,
      phone,
      email,
      facebook,
      twitter,
      insta,
      presidentName,
      vicePresidentName,
      secretaryName,
      presidentDescription,
      vicePresidentDescription,
      secretaryDescription,
      formLink,
    } = req.body;
    console.log(req.body);
    const profilePic = req.files.profilePic ? req.files.profilePic[0] : null;
    const coverPic = req.files.coverPic ? req.files.coverPic[0] : null;
    const presidentPic = req.files.presidentPic
      ? req.files.presidentPic[0]
      : null;
    const vicePresidentPic = req.files.vicePresidentPic
      ? req.files.vicePresidentPic[0]
      : null;
    const secretaryPic = req.files.secretaryPic
      ? req.files.secretaryPic[0]
      : null;

    console.log(name);
    const profilePicURL = profilePic
      ? await cloudinary.uploader
          .upload(profilePic.path)
          .then((result) => result.secure_url)
      : null;
    const coverPicURL = coverPic
      ? await cloudinary.uploader
          .upload(coverPic.path)
          .then((result) => result.secure_url)
      : null;
    const presidentPicURL = presidentPic
      ? await cloudinary.uploader
          .upload(presidentPic.path)
          .then((result) => result.secure_url)
      : null;
    const vicePresidentURL = vicePresidentPic
      ? await cloudinary.uploader
          .upload(vicePresidentPic.path)
          .then((res) => res.secure_url)
      : null;
    const secretaryURL = secretaryPic
      ? await cloudinary.uploader
          .upload(secretaryPic.path)
          .then((res) => res.secure_url)
      : null;
    const clubLeader = req.params.clubLeader;
    const AllPictures = [
      profilePic,
      coverPic,
      presidentPic,
      vicePresidentPic,
      secretaryPic,
    ];
    AllPictures.forEach((pic) => fs.unlinkSync(pic.path));

    const newClub = {
      name,
      department,
      description,
      admin: new mongoose.Types.ObjectId(clubLeader),
      profilePicture: profilePicURL || Club.schema.paths.profilePicture.default,
      coverPicture: coverPicURL || Club.schema.paths.coverPicture.default,
      contact: { phone, email, facebook, twitter, insta },
      formLink,
      ourTeam: {
        firstPerson: {
          name: presidentName,
          post: "President",
          description: presidentDescription,
          image: presidentPicURL,
        },
        secondPerson: {
          name: vicePresidentName,
          post: "Vice President",
          description: vicePresidentDescription,
          image: vicePresidentURL,
        },
        thirdPerson: {
          name: secretaryName,
          post: "Secretary",
          description: secretaryDescription,
          image: secretaryURL,
        },
      },
    };
    const result = await Club.create(newClub);
    if (!result) {
      if (profilePicURL) {
        await cloudinary.uploader.destroy(profilePic.public_id);
      }
      if (coverPicURL) {
        await cloudinary.uploader.destroy(coverPic.public_id);
      }
      if (presidentPicURL) {
        await cloudinary.uploader.destroy(presidentPic.public_id);
      }
      if (vicePresidentURL) {
        await cloudinary.uploader.destroy(vicePresidentPic.public_id);
      }
      if (secretaryPicURL) {
        await cloudinary.uploader.destroy(secretaryPic.public_id);
      }

      return res.status(500).json({
        status: "fail",
        message: "Could not save the data, images deleted",
      });
    }
    res.status(200).json({
      status: "Success",
      message: "Saved the club data",
      data: result,
    });
  } catch (error) {
    return next(new HttpError(500, `An error occured:${error.message}`));
  }
};

const UploadNotice = async (req, res, next) => {
  try {
  } catch (error) {
    return next(
      new HttpError(500 || error.status, `An error occured:${error.message}`)
    );
  }
};