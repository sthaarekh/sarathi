import express from "express";
import {
  getAllClubs,
  getNoticesOfClub,
  getSpNotice,
  ReportNotice,
} from "../Controllers/generalController.js";
const router = express.Router();

router.get("/clubs", getAllClubs);
router.get("/clubs/:clubId/notices", getNoticesOfClub);
router.get("/clubs/:clubId/notices/:noticeId", getSpNotice);
router.patch("/clubs/:clubId/notices/:noticeId/report", ReportNotice);
export default router; // ES Module syntax
