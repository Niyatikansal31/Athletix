import jwt from "jsonwebtoken"
import STATUS_CODES from "../utils/StatusCodes.js";

const authMiddleware=(req,res,next)=>{
    const header=req.headers.authorization;
    if(!header){
        res.status(STATUS_CODES.UNAUTHORIZED).json({
            msg: "User not LoggedIn"
        })
        return;
    }
    if (!header.startsWith("Bearer ")) {
        return res.status(STATUS_CODES.UNAUTHORIZED).json({
            msg: "Invalid authorization format"
        });
    }

    try{
        const token=header.split(" ")[1];
        const decoded = jwt.verify(token, process.env.secretToken);
        req.userPhone=decoded.mobileNumber;
        next();
    }catch(err){
        res.status(STATUS_CODES.UNAUTHORIZED).json({
            msg: err.message
        })
    }
}

export default authMiddleware;