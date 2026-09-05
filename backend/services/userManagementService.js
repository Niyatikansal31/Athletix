import User from "../models/user.js"

const getAllUsers=async()=>{
    const users=await User.find({})
    return users.map((user) => ({
        name: user.name,
        mobileNumber: user.mobileNumber,
        email: user.email,
        gender: user.gender,
        dob: user.dob,
        role: user.role,
        isActive: user.isActive,
        reasonForDeactivation: user.reasonForDeactivation,
        createdAt: user.createdAt
    }));
}

const getById=async(userid)=>{
    const user=await User.findOne({_id: userid})
    if(!user){
        throw new Error("User doesn't exist!")
    }
    return {
        name: user.name,
        mobileNumber: user.mobileNumber,
        email: user.email,
        gender: user.gender,
        dob: user.dob,
        role: user.role,
        isActive: user.isActive,
        reasonForDeactivation: user.reasonForDeactivation,
        createdAt: user.createdAt
    };
}

const deactivate=async(userid,reason)=>{
    const user=await User.findOne({_id: userid})
    if(!user){
        throw new Error("User doesn't exist!")
    }if(user.isActive===false){
        throw new Error("User Accout is already deactivated!")
    }
    user.isActive=false;
    user.reasonForDeactivation=reason
    await user.save()
}

const reactivate=async(userid)=>{
    const user=await User.findOne({_id: userid})
    if(!user){
        throw new Error("User doesn't exist!")
    }if(user.isActive===true){
        throw new Error("User Accout is already active!")
    }
    user.isActive=true;
    user.reasonForDeactivation=null;
    await user.save()
}

const deleteById=async(userid)=>{
    const user=await User.deleteOne({_id: userid})
    if(user.deletedCount===0){
        throw new Error("User doesn't exist!")
    }
}

export default {getAllUsers,getById,deactivate,reactivate,deleteById}