import User from "../models/user.js";
import bcrypt, { hash } from "bcryptjs"
import jwt from "jsonwebtoken"
import Cart from "../models/cart.js";
import Wishlist from "../models/wishlist.js";

const signUp=async({name,mobileNumber,password})=>{
    const user=await User.findOne({mobileNumber: mobileNumber})
    if(user){
        throw new Error("User Already Exists! Please Login instead.");
    }

    const hashedPassword=await bcrypt.hash(password,Number(process.env.BCRYPT_SALT_ROUNDS));
    const newUser=new User({
        name,
        mobileNumber,
        password: hashedPassword
    })
    await newUser.save();

    const newCart=new Cart({
        user: newUser._id,
        items: []
    })
    await newCart.save();

    const newWishlist=new Wishlist({
        user: newUser._id,
        items: []
    })
    await newWishlist.save();
}


const logIn=async({mobileNumber,password})=>{
    const user=await User.findOne({mobileNumber: mobileNumber})
    if(!user){
        throw new Error("User do not Exists! Please Signup instead.");
    }
    const isMatch=await bcrypt.compare(password,user.password);
    const jwtToken=jwt.sign({mobileNumber: mobileNumber, _id: user._id},process.env.secretToken);
    if(!isMatch){
        throw new Error("Password Incorrect!")
    }
    return jwtToken;
}


const changePassword=async(oldpassword,newpassword,user)=>{ 
    const isMatch=await bcrypt.compare(oldpassword,user.password)
        
    if(!isMatch){
        throw new Error("Password Incorrect!")
    }

    if(oldpassword==newpassword){
        throw new Error("New password cannt be same as old password!")
    }

    const hashedPassword=await bcrypt.hash(newpassword,Number(process.env.BCRYPT_SALT_ROUNDS))
    user.password = hashedPassword;
    await user.save();
    return user;
}


export default {signUp,logIn,changePassword};