const express=require('express')
const clubControllers=require('../Controllers/clubControllers')
const router=express.Router();

router.post('/signup',clubControllers.SignUp)

module.exports=router;