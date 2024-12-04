const express=require('express')
const adminController=require('../Controllers/adminController')
const authorization=require('../middlewares/authorization')

const router=express.Router();

router.get('/login',adminController.login)
router.get('/clubs',authorization.Admin,adminController.getAllClubs)
router.delete('/clubs/:clubId',authorization.Admin,adminController.deleteClub)
router.delete('/clubs/:clubId/notices/:noticeId',authorization.Admin,adminController.deleteNotice)
router.get('/clubs/:clubId/notices',authorization.Admin,adminController.getAllNoticesFromAClub)
module.exports=router;