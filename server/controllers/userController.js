const user = require("../model/user")


exports.userStorage=async(req,res)=>{
    try {
        const {name}=req.body;
        console.log(name);
        const response=await user.create({name})
        res.status(200).json({
            success:true,
            message:"User created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:"Unexpected error occured"
        })
    }
}