import express from "express";
import HttpError from "../Models/HttpError.js";
import Notice from "../Models/noticeSchema.js";
import Club from "../Models/clubs.js";
//Get all the clubs general details

export const getAllClubs = async (req, res, next) => {
  try {
    const clubs = await Club.find();

    res.status(200).json({
      status: "success",
      data: {
        clubs,
      },
    });
  } catch (error) {
    throw new HttpError(500, `An server error occured:${error}`);
  }
};

//Get all the posts of the specific club

export const getNoticesOfClub = async (req, res, next) => {
  try {
    const clubId = req.params.clubId;
    const notices = await Notice.find({ clubId: clubId });
    res.status(200).json({
      status: "success",
      data: {
        notices,
      },
    });
  } catch (error) {
    return next(new HttpError(500, `An error occured on the server:${error}`));
  }
};

//Get a specific notice from a specific Club

export const getSpNotice = async (req, res, next) => {
  try {
    const { clubId, noticeId } = req.params;
    const notice = await Notice.findOne({ _id: noticeId, clubId: clubId });
    res.status(200).json({
      status: "success",
      data: {
        notice,
      },
    });
  } catch (error) {
    return next(new HttpError(500, `An error occured on the server:${error}`));
  }
};
