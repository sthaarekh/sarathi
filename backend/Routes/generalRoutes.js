import express from "express";
import * as generalController from "../Controllers/generalController.js";
const router = express.Router();

router.get("/clubs", generalController.getAllClubs);
router.get("/clubs/:clubId/notices", generalController.getNoticesOfClub);
router.get("/clubs/:clubId/notices/:noticeId", generalController.getSpNotice);

export default router; // ES Module syntax
