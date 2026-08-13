import mongoose from "mongoose"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
import authService from "../services/authService.js"
import STATUS_CODES from "../utils/StatusCodes.js"

const signUp=async (req,res)=>{
    const {name,mobileNumber,password}=req.body;
    if(!mobileNumber){
        res.STATUS_CODES.BAD_REQUEST.json({
            msg: "Please enter mobile number."
        })
        return;
    }if(!name){
        res.STATUS_CODES.BAD_REQUEST.json({
            msg: "Please enter you name."
        })
        return;
    }if(!password){
        res.STATUS_CODES.BAD_REQUEST.json({
            msg: "Please enter your password."
        })
        return;
    }
    try{
        await authService.signUp(req.body);
        res.STATUS_CODES.CREATED.json({
            msg: "User created succesfully!"
        })
    }catch(err){
        res.STATUS_CODES.INTERNAL_SERVER_ERROR.json({
            msg: err.message
        })
    }
}

export default signUp;