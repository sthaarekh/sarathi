const express = require('express')
const generalController = require('../Controllers/generalController')

const router= express.Router();

router.get('/Home',generalController.getAllClubs);

module.exports=router;