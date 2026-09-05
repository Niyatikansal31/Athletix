import User from "../models/user.js";
import STATUS_CODES from "../utils/StatusCodes.js";

const authorizeAdmin=async (req,res,next)=>{
    try{
        const user=await User.findOne({mobileNumber: req.userPhone})
        if(user.role=='user'){
            return res.status(STATUS_CODES.FORBIDDEN).json({
                msg: "Access denied. Admin privileges are required to perform this action."
            })
        }

        next();
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

export default authorizeAdmin;