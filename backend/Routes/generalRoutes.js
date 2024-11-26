const express = require('express')
const generalController = require('../Controllers/generalController')

const router= express.Router();

router.get('/clubs',generalController.getAllClubs);
router.get('/clubs/:clubId/notices',generalController.getNoticesOfClub)
router.get('/clubs/:clubId/notices/:noticeId',generalController.getSpNotice)

module.exports=router;