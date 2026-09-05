import STATUS_CODES from "../utils/StatusCodes.js"
import userMagnagement from "../services/userManagementService.js";

const getAllUsers=async(req,res)=>{
    try{
        const users=await userMagnagement.getAllUsers();
        res.status(STATUS_CODES.OK).json({
            users: users
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const getById=async(req,res)=>{
    const userid=req.params.id;
    if(!userid){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please provide some id!"
        })
    }
    try{
        const user=await userMagnagement.getById(userid);
        res.status(STATUS_CODES.OK).json({
            user: user
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const deactivate=async(req,res)=>{
    const userid=req.params.id;
    const reason=req.body.reason;
    if(!userid){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please provide some id!"
        })
        return;
    }if(!reason){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please state the reason for deactivating the account!"
        })
        return;
    }
    try{
        await userMagnagement.deactivate(userid,reason);
        res.status(STATUS_CODES.OK).json({
            msg: "Your account has been deactivated!",
            reason: reason
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const reactivate=async(req,res)=>{
    const userid=req.params.id
    if(!userid){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please provide some id!"
        })
        return;
    }
    try{
        await userMagnagement.reactivate(userid)
        res.status(STATUS_CODES.OK).json({
            msg: "Account reactivated!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}


const deleteById=async(req,res)=>{
    const userid=req.params.id
    if(!userid){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please provide some id!"
        })
        return;
    }
    try{
        await userMagnagement.deleteById(userid)
        res.status(STATUS_CODES.OK).json({
            msg: "Account deleted!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}


export {getAllUsers,getById,deactivate,reactivate,deleteById}