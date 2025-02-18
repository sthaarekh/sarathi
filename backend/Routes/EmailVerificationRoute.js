import express from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../Models/clubAdmin.js";
const router = express.Router();

dotenv.config({ path: "../.env" });

router.get("/verify/:token", async (req, res) => {
  const token = req.params.token;
  if (!token) {
    return res.redirect("http://localhost:5173/login?toast=error");
  }

  try {
    console.log("Before decode");
    const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decode + " After decode");
    const userId = decode.userId;
    console.log(userId);

    const isUpdated = await User.updateOne(
      { _id: userId },
      { $set: { emailVerified: true } }
    );
    console.log("AFTER DB QUERY");

    if (isUpdated.modifiedCount > 0) {
      res.redirect("http://localhost:5173/login?toast=success");
    } else {
      res.redirect("http://localhost:5173/login?toast=error");
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.redirect("http://localhost:5173/login?toast=expired");
    }
    res.redirect("http://localhost:5173/login?toast=error");
  }
});

export default router;
