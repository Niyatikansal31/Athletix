import User from "../models/user.js"
import Product from "../models/product.js"
import Wishlist from "../models/wishlist.js"
const add=async(userPhone,productid)=>{
    const user=await User.findOne({mobileNumber: userPhone})
    const product=await Product.findOne({_id: productid})

    if(!product){
        throw new Error ("404 Product Not Found!")
    }

    const wishlistCart=await Wishlist.findOne({user: user._id.toString()})
    const exists = wishlistCart.items.some(
        item => item.product.toString() === productid
    );

    if(exists){
        throw new Error ("Item already present in wishlist!")
    }

    wishlistCart.items.push({
        product: productid
    })
    await wishlistCart.save()
}

const remove=async(userPhone,productid)=>{
    const user=await User.findOne({mobileNumber: userPhone})
    const product=await Product.findOne({_id: productid})

    if(!product){
        throw new Error ("404 Product Not Found!")
    }

    const wishlistCart=await Wishlist.findOne({user: user._id.toString()})
    const cartItem = wishlistCart.items.find(
        item => item.product.toString() === productid
    );

    if(!cartItem){
        throw new Error ("Item not present in wishlist!")
    }
    wishlistCart.items.splice(cartItem, 1);
    await wishlistCart.save()
}

const get=async(userPhone)=>{
    const user = await User.findOne({mobileNumber: userPhone})
    const wishlistCart=await Wishlist.findOne({user: user._id.toString()})
    return wishlistCart;
}

const clear=async(userPhone)=>{
    const user = await User.findOne({mobileNumber: userPhone})
    const wishlistCart=await Wishlist.findOne({user: user._id.toString()})
    wishlistCart.items=[];
    await wishlistCart.save()
    return wishlistCart;
}
export default {add,remove,get,clear}