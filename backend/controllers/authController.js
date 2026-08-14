import mongoose from "mongoose"
import User from "../models/user.js"
import bcrypt from "bcryptjs"
import authService from "../services/authService.js"
import jwt from "jsonwebtoken"
import STATUS_CODES from "../utils/StatusCodes.js"

const signUp=async (req,res)=>{
    const {name,mobileNumber,password}=req.body;
    if(!mobileNumber){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please enter mobile number."
        })
        return;
    }if(!name){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please enter you name."
        })
        return;
    }if(!password){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please enter your password."
        })
        return;
    }
    try{
        await authService.signUp(req.body);
        res.status(STATUS_CODES.CREATED).json({
            msg: "User created succesfully!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}


const logIn = async (req,res)=>{
    const {mobileNumber,password}=req.body;
    if(!mobileNumber){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please enter mobile number."
        })
        return;
    }
    if(!password){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please Enter a password"
        })
        return;
    }
    try{
        const token=await authService.logIn(req.body)
        res.status(STATUS_CODES.OK).json({
            Token: token
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}


const changePassword = async (req, res) => {
    try {
        const { oldpassword, newpassword } = req.body;
        if(!oldpassword || !newpassword){
            res.status(STATUS_CODES.BAD_REQUEST).json({
                msg: "Enter password!"
            })
            return;
        }
        const user=await User.findOne({mobileNumber: String(req.userPhone)})
        await authService.changePassword(
            oldpassword,
            newpassword,
            user
        );

        res.status(STATUS_CODES.OK).json({
            msg: "Password Changed!"
        });
    } catch (err) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        });
    }
};


export {signUp,logIn,changePassword};
