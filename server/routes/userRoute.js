const express=require('express')
const { userStorage } = require('../controllers/userController')

const router=express.Router();

router.post("/",userStorage)

module.exports=router