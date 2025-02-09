import express from "express";
import HttpError from "../Models/HttpError.js";
import Clubadmin from "../Models/clubAdmin.js";
import jwt from "jsonwebtoken";
import sendVerificationEmail from "../utils/EmailSender.js";
import bcrypt from "bcrypt";
import fs, { stat } from "fs";
import cloudinary from "../config/cloudinary.js";
import Club from "../Models/clubs.js";
import mongoose from "mongoose";
import Notice from "../Models/notices.js";
import { error } from "console";
import Question from "../Models/question.js";
import sendResetPasswordEmail from "../utils/ResetPasswordEmail.js";
import forgotPassword from "../Models/forgotPassword.js";
import crypto from 'crypto';
const date = new Date().toLocaleDateString();

// Signup Feature for club admin
export const SignUp = async (req, res, next) => {
  try {
    const {
      username,
      email,
      password,
      passwordConfirm,
      FirstQuestion,
      FirstAnswer,
      SecondQuestion,
      SecondAnswer,
      ThirdQuestion,
      ThirdAnswer,
      FourthQuestion,
      FourthAnswer,
      FifthQuestion,
      FifthAnswer,
    } = req.body;

    const newClubadmin = await Clubadmin.create({
      username,
      email,
      password,
      passwordConfirm,
    });
    const newQuestions = await Question.create({
      clubId: new mongoose.Types.ObjectId(newClubadmin._id),
      FirstQuestion: FirstQuestion,
      FirstAnswer: FirstAnswer,
      SecondQuestion: SecondQuestion,
      SecondAnswer: SecondAnswer,
      ThirdQuestion: ThirdQuestion,
      ThirdAnswer: ThirdAnswer,
      FourthQuestion: FourthQuestion,
      FourthAnswer: FourthAnswer,
      FifthQuestion: FifthQuestion,
      FifthAnswer: FifthAnswer,
    });

    const token = jwt.sign(
      { userId: newClubadmin._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    try {
      console.log("inside try");
      await sendVerificationEmail(email, token);

      res.status(201).json({
        status: "success",
        timestamp: date,
        data: {
          newClubadmin,
          newQuestions,
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
      const token = jwt.sign({ user }, process.env.JWT_SECRET_KEY, {
        expiresIn: "2h",
      });
      res.cookie("authToken", token, {
        http: true,
      });
      return res.status(200).json({
        status: "success",
        date: date,
        data: {
          userId: user._id,
        },
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

export const UploadNotice = async (req, res, next) => {
  try {
    const { description } = req.body;

    const clubId = req.params.clubId;
    let imagesURL = [];

    if (req.files) {
      imagesURL = await Promise.all(
        req.files.map(async (file) => {
          const uploadedImage = await cloudinary.uploader.upload(file.path);
          fs.unlinkSync(file.path);
          return uploadedImage.secure_url;
        })
      );
    } else if (!req.files) {
      imagesURL = null;
    }

    const newNotice = {
      description,
      image: imagesURL,
      club: new mongoose.Types.ObjectId(clubId),
    };

    const result = await Notice.create(newNotice);
    res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    return next(
      new HttpError(500 || error.status, `An error occured:${error.message}`)
    );
  }
};

export const deleteNotice = async (req, res, next) => {
  const { noticeId } = req.params;
  try {
    const notice = await Notice.findById(noticeId);
    if (!notice) {
      return res.status(404).json({
        status: "Fail",
        message: "Couldnot find the notice of the id provided",
      });
    }
    const images = notice.images;
    if (images && images.length > 0) {
      await Promise.all(
        images.map(async (imageURL) => {
          const publicId = imageURL
            .split("/")
            .slice(-2)
            .join("/")
            .split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        })
      );
    }
    await Notice.findByIdAndDelete(noticeId);
    return res.status(200).json({
      status: "Success",
      data: notice,
    });
  } catch (error) {
    return next(new HttpError(500, `AN error occured :${error.message}`));
  }
};

export const getAllNotices = async (req, res, next) => {
  const { clubId } = req.params;
  try {
    const club = await Club.findById(clubId);
    const notices = await Notice.find({
      club: new mongoose.Types.ObjectId(clubId),
    });

    if (!club) {
      return res.status(404).json({
        status: "Fail",
        message: "Couldnot find the club of the id provided",
      });
    }
    res.status(200).json({
      status: "Success",
      data: notices,
    });
  } catch (error) {
    return next(new HttpError(500, `An error occured:${error.message}`));
  }
};
// };
// export const uploadProfilePicture = async (req, res, next) => {
//   const { profilePic } = req.files;
//   const { clubId } = req.params;
//   if (!profilePic) {
//     return res.status(400).json({
//       status: "fail",
//       message: "No pic attached here !! cannot update profile",
//     });
//   }
//   try {
//     const club = await club.findById(clubId);
//     const oldURL = club.profilePicture;
//     const publicId = oldURL.split("/").slice(-2).join("/").split(".")[0];
//     await cloudinary.uploader.destroy(publicId);
//     const result = await cloudinary.uploader.upload(profilePic.path);
//     fs.unlinkSync(profilePic.path);
//     club.profilePicture = result.secure_url;
//     await club.save();
//     res.status(200).json({
//       status: "Success",
//       data: club,
//     });
//   } catch (error) {
//     return next(new HttpError(500, `An error occured :${error.message}`));
//   }
// };
// export const uploadCoverPhoto = async (req, res, next) => {};

export const UpdateClubDetails = async (req, res, next) => {
  const { clubId } = req.params;
  console.log(clubId);
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

  try {
    const club = await Club.findById(clubId);

    if (!club) {
      return new HttpError(404, "The club was not found");
    }
    const uploadPicture = async (file) => {
      console.log("uploading image");
      const ImageUrl = await cloudinary.uploader.upload(file.path);

      fs.unlinkSync(file.path);
      return ImageUrl.secure_url;
    };

    const profilePic = req.files?.profilePic?.[0] || null;
    const coverPic = req.files?.coverPic?.[0] || null;
    const presidentPic = req.files?.presidentPic?.[0] || null;
    const vicePresidentPic = req.files?.vicePresidentPic?.[0] || null;
    const secretaryPic = req.files?.secretaryPic?.[0] || null;

    const profilePicURL = profilePic
      ? await uploadPicture(profilePic)
      : club.profilePicture;
    const coverPicURL = coverPic
      ? await uploadPicture(coverPic)
      : club.coverPicture;
    const presidentPicURL = presidentPic
      ? await uploadPicture(presidentPic)
      : club.ourTeam.firstPerson.image;
    const vicePresidentURL = vicePresidentPic
      ? await uploadPicture(vicePresidentPic)
      : club.ourTeam.secondPerson.image;
    const secretaryURL = secretaryPic
      ? await uploadPicture(secretaryPic)
      : club.ourTeam.thirdPerson.image;

    const updatedClub = await Club.findByIdAndUpdate(
      clubId,
      {
        name: name || club.name,
        department: department || club.department,
        description: description || club.description,
        profilePicture: profilePicURL,
        coverPicture: coverPicURL,
        contact: { phone, email, facebook, twitter, insta },
        formLink: formLink || club.formLink,
        ourTeam: {
          firstPerson: {
            name: presidentName || club.ourTeam.firstPerson.name,
            post: "President",
            description:
              presidentDescription || club.ourTeam.firstPerson.description,
            image: presidentPicURL,
          },
          secondPerson: {
            name: vicePresidentName || club.ourTeam.secondPerson.name,
            post: "Vice President",
            description:
              vicePresidentDescription || club.ourTeam.secondPerson.description,
            image: vicePresidentURL,
          },
          thirdPerson: {
            name: secretaryName || club.ourTeam.thirdPerson.name,
            post: "Secretary",
            description:
              secretaryDescription || club.ourTeam.thirdPerson.description,
            image: secretaryURL,
          },
        },
      },
      { new: true }
    );

    if (!updatedClub) {
      return res.status(500, `An error occured :${error.message}`);
    }
    res.status(200).json({
      status: "Success",
      message: "Club data updated successfully",
      data: updatedClub,
    });
  } catch (error) {
    return next(new HttpError(500, `An error occured :${error.message}`));
  }
};

// Forgot Password Function
export const forgotPasswordToken = async (req, res, next) => {
  try {
    const { email } = req.body;
    console.log("Received email:", email);

    if (!email) {
      return next(new HttpError(400, "Email is required"));
    }

    const admin = await forgotPassword.findOne({ email });
    if (!admin) {
      return next(new HttpError(404, "Admin not found"));
    }

    if (!admin.createPasswordResetToken) {
      return next(new HttpError(500, "Error generating reset token"));
    }

    // Generate Reset Token (expires in 10 minutes)
    const resetToken = admin.createPasswordResetToken();

    // Save the token and expiry in the database
    await admin.save({ validateBeforeSave: false });
    // Send Reset Email
    await sendResetPasswordEmail(email, resetToken);

    res.status(200).json({
      status: "success",
      message: "Password reset link sent!",
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    next(new HttpError(500, `Internal server error: ${error.message}`));
  }
};

export const resetPassword = async (req, res) => {
  try {
    //Get the token from the URL and the new password from the body
    const { token } = req.params;
    const { newPassword } = req.body;

    //Find the user with the matching reset password token
    const user = await forgotPassword.findOne({
      resetPasswordToken: { $exists: true },
      resetPasswordExpires: { $gt: Date.now() }, // Token should be valid (not expired)
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid faor expired token" });
    }

    //Hash the incoming token to compare with the stored one
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    if (hashedToken !== user.resetPasswordToken) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    //Update the user's password
    user.password = newPassword; // Set the new password here
    user.resetPasswordToken = undefined; // Clear the reset token after use
    user.resetPasswordExpires = undefined; // Clear the expiry date

    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in password reset:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};