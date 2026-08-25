import STATUS_CODES from "../utils/StatusCodes.js"
import orderService from "../services/orderService.js"

const addOrder=async(req,res)=>{
    const userPhone=req.userPhone
    const {items,address,paymentMode}=req.body

    if(!items || items.length===0){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "No items selected for order!"
        })
    }
    if(!address && !address.name && !address.mobileNumber && !address.pincode && !address.street && !address.state && !address.city){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please Provide your complete address along with name and phone number!"
        })
    }
    if(!paymentMode){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Select a payment mode!"
        })
    }
    try{
        await orderService.addOrder(userPhone,items,address,paymentMode)
        res.status(STATUS_CODES.CREATED).json({
            msg: "Order Placed Succesfully!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const getAllOrder=async(req,res)=>{
    const mobileNumber=req.userPhone;
    try{
        const order=await orderService.getAllOrder(mobileNumber)
        res.status(STATUS_CODES.OK).json({
            orders: order
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const getOrderById=async(req,res)=>{
    const orderid=req.params.id;

    if(!orderid){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please Enter some orderid"
        })
    }
    try{
        const order=await orderService.getOrderById(orderid)
        res.status(STATUS_CODES.OK).json({
            order: order
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const cancel=async(req,res)=>{
    const orderid=req.params.orderid;
    const userPhone=req.userPhone;

    if(!orderid){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please prove some order id"
        })
    }
    
    try{
        await orderService.cancel(userPhone,orderid);
        res.status(STATUS_CODES.OK).json({
            msg: "Your order has been cancelled!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const updateStatus=async(req,res)=>{
    const orderid=req.params.orderid;
    const status=req.body.status;

    if(!orderid){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Please prove some order id"
        })
    }
    if(!status){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Enter some status to update!"
        })
    }
    try{
        await orderService.updateStatus(orderid,status);
        res.status(STATUS_CODES.OK).json({
            msg: "Status has been updated!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const getOrderAdmin=async(req,res)=>{
    try{
        const order=await orderService.getOrder();
        res.status(STATUS_CODES.OK).json({
            order: order
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

export {addOrder,getAllOrder,getOrderById,cancel,updateStatus,getOrderAdmin}