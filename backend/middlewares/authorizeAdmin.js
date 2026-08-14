import User from "../models/user.js";
import STATUS_CODES from "../utils/StatusCodes.js";

const authorizeAdmin=async (req,res,next)=>{
    try{
        const user=await User.findOne({mobileNumber: req.userPhone})
        if(user.role=='user'){
            res.status(STATUS_CODES.UNAUTHORIZED).json({
                msg: "You do not have access to add the products!"
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