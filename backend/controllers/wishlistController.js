import wishlistService from "../services/wishlistService.js";
import STATUS_CODES from "../utils/StatusCodes.js";

const add=async(req,res)=>{
    const productid=req.params.id;
    if(!productid){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Provide some Product Id"
        })
    }
    const userPhone=req.userPhone
    try{
        await wishlistService.add(userPhone,productid)
        res.status(STATUS_CODES.OK).json({
            msg:"Product Added to your wishlist!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}


const remove=async(req,res)=>{
    const productid=req.params.id;
    if(!productid){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Provide some Product Id"
        })
    }
    const userPhone=req.userPhone
    try{
        await wishlistService.remove(userPhone,productid)
        res.status(STATUS_CODES.OK).json({
            msg:"Product Removed from your wishlist!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const get=async(req,res)=>{
    const userPhone=req.userPhone
    try{
        const wishlistCart=await wishlistService.get(userPhone)
        res.status(STATUS_CODES.OK).json({
            items: wishlistCart.items
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const clear=async(req,res)=>{
    const userPhone=req.userPhone
    try{
        const wishlistCart=await wishlistService.clear(userPhone)
        res.status(STATUS_CODES.OK).json({
            items: wishlistCart.items
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

export {add,remove,get,clear}