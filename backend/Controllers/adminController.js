import jwt from "jsonwebtoken";
import Clubs from "../Models/clubs.js";
import HttpError from "../Models/HttpError.js";
import Notices from "../Models/notices.js";
import * as Questions from "../Models/question.js";
import mongoose from "mongoose";
// import Question from "../Models/question.js";

export const login = (req, res, next) => {
  const { username, password } = req.body;
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    res.status(401).json({
      status: "fail",
      message: "Invalid credintials .Please try again ",
    });
  } else {
    const token = jwt.sign(
      { username, password, role: "admin" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1hour" }
    );
    res.cookie("authToken", token, {
      httpOnly: true,
      sameSite: "Strict",
      // secure:true
    });
    return res.status(200).json({
      status: "success",
      message: "AdminLogin successful!",
    });
  }
};

export const getAllClubs = async (req, res, next) => {
  try {
    const clubs = await Clubs.find();
    res.status(200).json({
      status: "success",
      data: {
        clubs,
      },
    });
  } catch (error) {
    return next(
      new HttpError(
        error.statusCode || 500,
        `An error occured:${error.message}`
      )
    );
  }
};
export const deleteClub = async (req, res, next) => {
  const clubId = req.params.clubId;
  try {
    const club = await Clubs.findByIdAndDelete(clubId);
    if (!club) {
      return next(new HttpError(404, "No club of that id was found"));
    } else {
      const result = Notices.deleteMany({ clubId: clubId });
      res.status(202).json({
        status: "success",
        message: "Club and related all notices has been deleted Successfully",
        noticesDeleted: (await result).deletedCount,
      });
    }
  } catch (error) {
    return next(
      new HttpError(
        error.statusCode || 500,
        `An error occurred:${error.message}`
      )
    );
  }
};
export const verifyClub = async (req, res, next) => {
  const clubId = req.params.clubId;
  console.log("Request has been received");
  try {
    const VerifyGarnuParneClub = await Clubs.findByIdAndUpdate(
      clubId,
      { $set: { adminVerified: true } },
      { new: true }
    );
    if (!VerifyGarnuParneClub) {
      res.status(404).json({
        message: "The club of this id doesnot exists",
      });
    } else {
      try {
        await Question.deleteMany({
          clubId: new mongoose.Types.ObjectId(clubId),
        });
        console.log(Question);
      } catch (error) {
        throw error;
      }
      res.status(200).json({
        status: "success",
        data: {
          VerifyGarnuParneClub,
        },
        message:
          "The club has been successfully verified by the Admin and all the questions related to this club is now deleted",
      });
    }
  } catch (error) {
    return next(
      new HttpError(
        error.statusCode || 500,
        `An error occured:${error.message}`
      )
    );
  }
};

export const deleteQuestionsForAClub = async (req, res) => {
  const { clubId } = req.params;
  console.log("Received clubId:", clubId);

  try {
    await Question.deleteMany({ clubId: new mongoose.Types.ObjectId(clubId) });
    return res.status(200).json({
      message: "Questions deleted successfully",
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while deleting questions." });
  }
};

export const getllAllQuestions = async (req, res, next) => {
  const clubId = req.params.clubId;

  try {
    const AllQuestions = await Questions.find({ clubId: clubId });

    if (!AllQuestions || AllQuestions.length === 0) {
      return next(new HttpError("No questions found for this club", 404));
    }

    return res.status(200).json({
      status: "Success",
      data: { AllQuestions },
    });
  } catch (error) {
    return next(new HttpError(`An error occurred: ${error.message}`, 500));
  }
};

export const getAllNoticesFromAClub = async (req, res, next) => {
  const clubId = req.params.clubId;
  try {
    const notices = await Notices.find({ clubId });
    if (!notices) {
      return new HttpError(404, `Not found`);
    } else {
      return res.status(200).json({
        status: "success",
        data: {
          notices,
        },
      });
    }
  } catch (error) {
    return next(
      new HttpError(error.statusCode || 500, `An error occured${error.message}`)
    );
  }
};

export const deleteNotice = async (req, res, next) => {
  const noticeId = req.params.noticeId;
  const clubId = req.params.clubId;
  try {
    const notice = await Notices.findByIdAndDelete(noticeId);
    if (!notice) {
      return next(new HttpError(404, "Not found"));
    } else {
      return res.status(202).json({
        status: "success",
        message: "Notice has been deleted successfully",
      });
    }
  } catch (error) {
    return next(
      new HttpError(
        error.statusCode || 500,
        `An error occured:${error.message}`
      )
    );
  }
};
