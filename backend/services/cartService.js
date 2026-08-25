import Cart from "../models/cart.js";
import Product from "../models/product.js"
import User from "../models/user.js";

const add = async (productid,mobileNumber)=>{
    const product=await Product.findOne({_id: productid});
    const user=await User.findOne({mobileNumber: mobileNumber});

    if (!product) {
        throw new Error("404 Product Not Found");
    }
    const cart=await Cart.findOne({user: user._id})
    
    const cartItem = cart.items.find(
        item => item.product.toString() === productid
    );
    if(cartItem){
        cartItem.quantity+=1;
    }else{
        cart.items.push({
            product: product._id,
            quantity: 1
        })
    }
    await cart.save();
}

const getMyCart=async(mobileNumber)=>{
    const currentUser=await User.findOne({mobileNumber: mobileNumber})
    const cart=await Cart.findOne({user: currentUser._id})
    return cart;
}

const update = async (productid,mobileNumber,quantity)=>{
    const user=await User.findOne({mobileNumber: mobileNumber});
    const cart=await Cart.findOne({user: user._id})
    const cartItem = cart.items.find(
        item => item.product.toString() === productid
    );
    if(cartItem){
        cartItem.quantity=quantity;
    }else{
        throw new Error("404 Product Not Found");
    }
    await cart.save();
}

const deleteItem = async (productid,mobileNumber)=>{
    const user=await User.findOne({mobileNumber: mobileNumber});
    const cart=await Cart.findOne({user: user._id})
    
    const cartItem = cart.items.find(
        item => item.product.toString() === productid
    );
    if(cartItem!==-1){
        cart.items.splice(cartItem, 1);
        await cart.save()
    }else{
        throw new Error("404 Product Not Found");
    }
    await cart.save();
}

const clear=async(mobileNumber)=>{
    const currentUser=await User.findOne({mobileNumber: mobileNumber})
    const cart=await Cart.findOne({user: currentUser._id})
    cart.items=[];
    await cart.save()
    return cart;
}

export default {add,getMyCart,clear,update,deleteItem};