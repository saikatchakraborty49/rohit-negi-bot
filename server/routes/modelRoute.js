const express=require("express");
const {model}=require("../controllers/AI model/LLM");

const router=express.Router();

router.post("/",model)

module.exports=router