import express from "express";
import jwt from "jsonwebtoken";
import HttpError from "../Models/HttpError.js";

export const Admin = async (req, res, next) => {
  const token = req.cookies.authToken;
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized: No token provided",
    });
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return next(
      new HttpError(
        error.statusCode || 500,
        `An error occured:${error.message}`
      )
    );
  }
};
