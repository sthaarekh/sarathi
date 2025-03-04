import jwt from "jsonwebtoken";
import Clubs from "../Models/clubs.js";
import Clubadmin from "../Models/clubAdmin.js";
import HttpError from "../Models/HttpError.js";
import Notices from "../Models/notices.js";
import Questions from "../Models/question.js";
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
      // try {
      //   await Question.deleteMany({
      //     clubId: new mongoose.Types.ObjectId(clubId),
      //   });
      //   console.log(Question);
      // } catch (error) {
      //   throw error;
      // }
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

export const holdClub = async (req, res, next) => {
  const clubId = req.params.clubId;
  console.log("Hold request received");
  try {
    const HoldGarnuParneClub = await Clubs.findByIdAndUpdate(
      clubId,
      { $set: {adminVerified: false } },
      { new: true }
    );
    
    if (!HoldGarnuParneClub) {
      return res.status(404).json({
        message: "The club with this ID does not exist",
      });
    }
    
    res.status(200).json({
      status: "success",
      data: {
        HoldGarnuParneClub,
      },
      message: "The club has been successfully put on hold by the Admin.",
    });
  } catch (error) {
    return next(
      new HttpError(
        error.statusCode || 500,
        `An error occurred: ${error.message}`
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

export const getAllQuestions = async (req, res, next) => {
  const clubId = req.params.clubId;

  if (!mongoose.Types.ObjectId.isValid(clubId)) {
    return next(new HttpError("Invalid club ID format", 400));
  }

  try {
    const allQuestions = await Questions.find({ clubId: new mongoose.Types.ObjectId(clubId) });

    if (!allQuestions.length) {
      return next(new HttpError("No questions found for this club", 404));
    }

    return res.status(200).json({
      status: "Success",
      data: { allQuestions },
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

export const getAllReportedNotices = async (req, res, next) => {
  try {
    // Find all notices with reportCount greater than 0
    const reportedNotices = await Notices.find({ 
      reportCount: { $gt: 0 } 
    })
    .sort({ reportCount: -1 }) // Sort by reportCount in descending order (most reported first)
    .populate({
      path: 'club',
      select: 'name profilePicture' // Only fetch the club name and profile picture
    });
    
    if (!reportedNotices || reportedNotices.length === 0) {
      return next(new HttpError(404, `No reported notices found`));
    }

    return res.status(200).json({
      status: "success",
      results: reportedNotices.length,
      data: {
        notices: reportedNotices,
      },
    });
  } catch (error) {
    return next(
      new HttpError(error.statusCode || 500, `An error occurred: ${error.message}`)
    );
  }
};

export const deleteNotice = async (req, res, next) => {
  const noticeId = req.params.noticeId;
  // const clubId = req.params.clubId;
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

export const deleteNoticesByClub = async (req, res, next) => {
  const clubId = req.params.clubId;
  try {
    const result = await Notices.deleteMany({ club: clubId });
    if (result.deletedCount === 0) {
      return next(new HttpError(404, "No notices found for this club"));
    }
    return res.status(202).json({
      status: "success",
      message: `Deleted ${result.deletedCount} notices for the club successfully`,
    });
  } catch (error) {
    return next(
      new HttpError(
        error.statusCode || 500,
        `An error occurred: ${error.message}`
      )
    );
  }
};

export const deleteClubAdmin = async (req, res, next) => {
  const adminId = req.params.adminId;
  try {
    const admin = await Clubadmin.findByIdAndDelete(adminId);
    if (!admin) {
      return next(new HttpError(404, "Not found"));
    } else {
      return res.status(202).json({
        status: "success",
        message: "Admin has been deleted successfully",
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