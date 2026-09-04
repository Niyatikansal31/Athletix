import Address from "../models/address.js"
import User from "../models/user.js"


const add = async(userPhone, name, phone, street, city, state, pincode, label, isDefault)=>{
    const user=await User.findOne({mobileNumber: userPhone})
    const address=new Address({
        user: user._id,
        name,
        phone,
        street, 
        city, 
        state, 
        pincode, 
        label,
        isDefault
    })

    await address.save();
}


const getAllAddress=async(userPhone)=>{
    const user=await User.findOne({mobileNumber: userPhone})
    const userid=user._id

    const addresses=await Address.find({user: userid})
    if(addresses.length===0)
        throw new Error ("No address saved!")
    return addresses;
}

const getById=async(addressid)=>{
    const address=await Address.findOne({_id: addressid})
    if(!address)
        throw new Error ("No such address saved!")
    return address;
}

const deleteById=async(addressid)=>{
    const address=await Address.findOne({_id: addressid})
    if(!address)
        throw new Error ("No such address saved!")
    await Address.deleteOne({_id: address._id})
}

const update = async(id,updateData)=>{
    const address=await Address.findOne({_id: id})
     if (!address) {
        throw new Error("404 Address Not Found");
    }
    const allowedFields = [
        "name",
        "phone",
        "street",
        "city",
        "state",
        "pincode",
        "label",
        "isDefault"
    ];
    const updateFields = Object.keys(updateData).filter((key) =>
        allowedFields.includes(key)
    );


    const updates = {};

    updateFields.forEach((key) => {
        updates[key] = updateData[key];
    });

    const updatedAddress = await Address.findByIdAndUpdate(
        id,
        { $set: updates },
        {
            new: true,
            runValidators: true
        }
    );

}


const setDefault=async(userPhone, addressid)=>{
    const user= await User.findOne({mobileNumber: userPhone})
    const address=await Address.findOne({_id: addressid})

    if(!address || address.user.toString()!==user._id.toString()){
        throw new Error ("Please provide a valid Address!")
    }

    await Address.updateMany(
        { user: user._id },
        { $set: { isDefault: false } }
    );

    address.isDefault=true;
    await address.save()
}

export default {add,getAllAddress,getById,deleteById,update,setDefault}