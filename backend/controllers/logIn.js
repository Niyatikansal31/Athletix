import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import authService from "../services/authService.js";
import STATUS_CODES from "../utils/StatusCodes.js";

const logIn = async (req,res)=>{
    const {mobileNumber,password}=req.body;
    if(!mobileNumber){
        res.STATUS_CODES.BAD_REQUEST.json({
            msg: "Please enter mobile number."
        })
        return;
    }
    if(!password){
        res.STATUS_CODES.BAD_REQUEST.json({
            msg: "Please Enter a password"
        })
        return;
    }
    try{
        const token=await authService.logIn(req.body)
        res.STATUS_CODES.CREATED.json({
            Token: token
        })
    }catch(err){
        res.STATUS_CODES.INTERNAL_SERVER_ERROR.json({
            msg: err.message
        })
    }
}
export default logIn;