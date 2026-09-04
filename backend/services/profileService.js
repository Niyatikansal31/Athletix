import User from "../models/user.js"

const get=async(userPhone)=>{
    const user= await User.findOne({mobileNumber: userPhone})
    return {
        name: user.name,
        mobileNumber: user.mobileNumber,
        email: user.email,
        dob: user.dob,
        gender: user.gender
    }
}

const update=async(userPhone,updateData)=>{
    const user= await User.findOne({mobileNumber: userPhone})
    const allowedFields=[
        "name",
        "email",
        "dob",
        "gender",
    ]
    const updateFields = Object.keys(updateData).filter((key) =>
        allowedFields.includes(key)
);

    const updates = {};
    updateFields.forEach((key) => {
        updates[key] = updateData[key];
    });

    const updatedUser=await User.findByIdAndUpdate(
        user._id,
        {$set: updates},
        {
            new: true,
            runValidators: true
        }
    )
}

const deactivate=async(userPhone)=>{
    const user= await User.findOne({mobileNumber: userPhone})
    user.isActive=false;
    await user.save()
}

export default {get,update,deactivate}