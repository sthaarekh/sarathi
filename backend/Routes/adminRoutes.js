import express from "express";
import * as adminController from "../Controllers/adminController.js";
import * as authorization from "../middlewares/authorization.js";

const router = express.Router();

router.get("/login", adminController.login);
router.get("/clubs", adminController.getAllClubs);
router.patch("/clubs/:clubId", adminController.verifyClub);
router.patch("/clubs/hold/:clubId", adminController.holdClub);
router.delete("/clubs/:clubId", adminController.deleteClub);
router.delete("/notice/:noticeId", adminController.deleteNotice);
router.delete("/notices/:clubId", adminController.deleteNoticesByClub);
router.delete("/clubadmin/:adminId", adminController.deleteClubAdmin);
router.get("/clubs/:clubId/notices", adminController.getAllNoticesFromAClub);
router.get("/reportednotices", adminController.getAllReportedNotices);
router.get("/clubs/:clubId/questions", adminController.getAllQuestions);
router.delete(
  "/clubs/:clubId/questions",
  adminController.deleteQuestionsForAClub
);

export default router; // ES Module syntax
