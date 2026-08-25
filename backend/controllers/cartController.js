import STATUS_CODES from "../utils/StatusCodes.js";
import cartService from "../services/cartService.js";

const add=async(req,res)=>{
    const productid=req.params.productId;
    const mobileNumber=req.userPhone;
    
    if(!productid){
        res.status(STATUS_CODES.NOT_FOUND).json({
            msg: "404 Product Not Found!"
        })
        return;
    }
    try{
        await cartService.add(productid,mobileNumber);
        res.status(STATUS_CODES.OK).json({
            msg: "Product Added Successfully!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const getMyCart=async(req,res)=>{
    const mobileNumber=req.userPhone;
    try{
        const cart=await cartService.getMyCart(mobileNumber);
        res.status(STATUS_CODES.OK).json({
            "cart": cart.items
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const update=async(req,res)=>{
    const productid=req.params.productId;
    const mobileNumber=req.userPhone;
    const quantity=req.body.quantity
    
    if(!productid){
        res.status(STATUS_CODES.NOT_FOUND).json({
            msg: "404 Product Not Found!"
        })
        return;
    }
    if(!quantity){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Enter some quantity!"
        })
        return;
    }
    try{
        await cartService.update(productid,mobileNumber,quantity);
        res.status(STATUS_CODES.OK).json({
            msg: "Cart Updated Successfully!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const deleteItem=async(req,res)=>{
    const productid=req.params.productId;
    const mobileNumber=req.userPhone;
    
    if(!productid){
        res.status(STATUS_CODES.NOT_FOUND).json({
            msg: "404 Product Not Found!"
        })
        return;
    }
    try{
        await cartService.deleteItem(productid,mobileNumber);
        res.status(STATUS_CODES.OK).json({
            msg: "Product Deleted Successfully!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const clear=async(req,res)=>{
    const mobileNumber=req.userPhone;
    try{
        const cart=await cartService.clear(mobileNumber);
        res.status(STATUS_CODES.OK).json({
            "cart": cart.items
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

export {add,getMyCart,clear,update,deleteItem};