const express=require('express')
const adminController=require('../Controllers/adminController')
const authorization=require('../middlewares/authorization')

const router=express.Router();

router.get('/login',adminController.login)
router.get('/clubs',adminController.getAllClubs)
router.patch('/clubs/:clubId',adminController.verifyClub)
router.delete('/clubs/:clubId',adminController.deleteClub)
router.delete('/clubs/:clubId/notices/:noticeId',adminController.deleteNotice)
router.get('/clubs/:clubId/notices',adminController.getAllNoticesFromAClub)
router.get('/clubs/:clubId/questions',adminController.getllAllQuestions)
router.delete('/clubs/:clubId/questions',adminController.deleteQuestionsForAClub)

module.exports=router;