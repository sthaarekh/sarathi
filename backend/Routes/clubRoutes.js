import express from "express";
import * as clubControllers from "../Controllers/clubControllers.js";
import upload from "../middlewares/Multer.js";
const router = express.Router();

router.post("/signup", clubControllers.SignUp);
router.post("/login", clubControllers.login);

router.post(
  "/clubDetails/:clubLeader",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
    { name: "presidentPic", maxCount: 1 },
    { name: "vicePresidentPic", maxCount: 1 },
    { name: "secretaryPic", maxCount: 1 },
  ]),
  clubControllers.clubDetails
);
router.delete("/notice/:noticeId", clubControllers.deleteNotice);
router.post(
  "/notice/:clubId",
  upload.array("images", 5),
  clubControllers.UploadNotice
);
router.get("/notice/:clubId", clubControllers.getAllNotices);
router.patch(
  "/clubDetails/:clubId",
  upload.fields([
    { name: "profilePic", maxCount: 1 },
    { name: "coverPic", maxCount: 1 },
    { name: "presidentPic", maxCount: 1 },
    { name: "vicePresidentPic", maxCount: 1 },
    { name: "secretaryPic", maxCount: 1 },
  ]),
  clubControllers.UpdateClubDetails
);
// Route for forgot password
router.post("/forgot-password", clubControllers.forgotPasswordToken);
// Route for reset password
router.post("/reset-password/:token", clubControllers.resetPassword);

export default router;
