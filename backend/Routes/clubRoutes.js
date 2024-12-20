import express from "express";
import * as clubControllers from "../Controllers/clubControllers.js";
import upload from "../middlewares/Multer.js";
const router = express.Router();

router.post("/signup", clubControllers.SignUp);
router.get("/login", clubControllers.login);

router.post(
  "/profilePic",
  upload.single("file"),
  clubControllers.UploadProfilePic
);

export default router; // ES Module syntax
