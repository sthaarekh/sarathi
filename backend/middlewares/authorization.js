import jwt from "jsonwebtoken";
import HttpError from "../Models/HttpError.js";

export const Admin = async (req, res, next) => {
  try {
    const token = req.cookies.authToken;

    if (!token) {
      return next(new HttpError(401, "Unauthorized: No token provided"));
    }

    const user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = user;

    next();
  } catch (error) {
    let errorMessage = "Authentication failed.";
    let statusCode = 403; // Default to Forbidden

    if (error.name === "TokenExpiredError") {
      errorMessage = "Session expired. Please log in again.";
      statusCode = 401; // Unauthorized
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Invalid token. Please log in again.";
    }

    next(new HttpError(statusCode, errorMessage));
  }
};
