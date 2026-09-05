import profileService from "../services/profileService.js";
import STATUS_CODES from "../utils/StatusCodes.js";

const get=async(req,res)=>{
    const userPhone=req.userPhone;

    try{
        const user=await profileService.get(userPhone);
        res.status(STATUS_CODES.OK).json({
            user: user
        })
    }catch(err){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: err.msg
        })
    }
}

const update=async(req,res)=>{
    const userPhone=req.userPhone;
    const {name,email,dob,gender}=req.body

    if(!name && !email && !gender && !dob){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Update atleast 1 feild!"
        })
        return
    }
    try{
        await profileService.update(userPhone,{name,email,gender,dob})
        res.status(STATUS_CODES.OK).json({
            msg: "Updated Succesfully!"
        })
    }catch(err){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: err.msg
        })
    }
}

const deactivate=async(req,res)=>{
    const userPhone=req.userPhone;
    const reason=req.body.reason;
    try{
        await profileService.deactivate(userPhone,reason)
        res.status(STATUS_CODES.OK).json({
            msg: "Deactivated successfully!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

export {get,update,deactivate}