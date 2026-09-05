import Cart from "../models/cart.js"
import Order from "../models/order.js"
import Product from "../models/product.js"
import User from "../models/user.js"
import cartService from "./cartService.js"

const addOrder=async(userPhone,items,address,paymentMode)=>{
    console.log(userPhone)
    const user=await User.findOne({mobileNumber: userPhone})
    const cart= await Cart.findOne({user: user._id})
    console.log(cart)
    if(cart.items.length===0){
        throw new Error ("Your Cart feels light!")
    }

    const cartItems=cart.items;
    let totalAmount=0;
    for (const item of items) {
        const prod = await Product.findById(item.product);
        if(!prod){
            throw new Error ("404 Product Not Found")
        }

        const cartItem = cartItems.find(
            cartItem =>
                cartItem.product.toString() === item.product.toString()
        );
        
        if(!cartItem){ 
            throw new Error ("404 Product Not found in Cart!")
        }

        if(cartItem.quantity<item.quantity){
            throw new Error("Requested quantity exceeds cart quantity!");
        }

        if(!Number.isInteger(item.quantity)){
            throw new Error ("Quantity must be some integer!")
        }

        if(item.quantity>prod.stock){
            throw new Error ("Only "+prod.stock+" items are left!")
        }

        item.price = prod.price
        item.returnable=prod.returnable
        item.exchangeable=prod.exchangeable
        totalAmount+=(item.quantity*item.price)
    };

    const order=new Order({
        user: user._id,
        items,
        totalAmount,
        address,
        paymentMode
    })

    await order.save()

    for(const item of items){
        const prod = await Product.findById(item.product);
        prod.stock-=item.quantity
        await prod.save()
        const cartItem = cartItems.find(
            cartItem =>
                cartItem.product.toString() === item.product.toString()
        );
        cartItem.quantity-=item.quantity
        if(cartItem.quantity===0){
            await cartService.deleteItem(cartItem.product,userPhone)
        }
    }
}


const getAllOrder=async(mobileNumber)=>{
    const user=await User.find({mobileNumber: mobileNumber})
    const userid=(user._id).toString()
    const order=await Order.findOne({user: userid})
    if(!order){
        throw new Error ("No order placed!")
    }
    return order;
}


const getOrderByIdUser=async(orderid,userPhone)=>{
    const user=await User.findOne({mobileNumber: userPhone})
    const order=await Order.findById({_id: orderid, user: user._id.toString()})
    if(!order){
        throw new Error ("No such order placed!")
    }
    return order;
}


const cancel=async (userPhone,orderid)=>{
    const user=await User.findOne({mobileNumber: userPhone})
    const order=await Order.findById({_id: orderid})

    
    if(!order){
        throw new Error ("No such Order present")
    }
    const userid=user._id.toString();
    if(userid!=(order.user.toString())){
        throw new Error ("No such Order associated with this user!")
    }

    if(order.status==="shipped" || order.status==="out_for_delivery"){
        throw new Error ("Order cannot be cancelled now!")
    }
    
    if(order.status==="delivered"){
        throw new Error ("Your Order has been already delivered!")
    }

    if(order.status === "cancelled"){
        throw new Error("Order is already cancelled!");
    }
    const cartItems=order.items
    for(const cartItem of cartItems){
        const product=await Product.findById({_id: cartItem.product.toString()})
        product.stock+=cartItem.quantity
        await product.save()
    }

    order.status="cancelled"
    await order.save()

}

const updateStatus=async(orderid,status)=>{
    const order=await Order.findById({_id: orderid})
    if(!order){
        throw new Error("No such Order present");
    }
    const allowedTransitions = {
        confirmed: ["packed", "cancelled"],
        packed: ["shipped", "cancelled"],
        shipped: ["out_for_delivery"],
        out_for_delivery: ["delivered"],
        delivered: [],
        cancelled: []
    };

     if (!allowedTransitions[order.status].includes(status)) {
        throw new Error(
            `Cannot change order status from ${order.status} to ${status}`
        );
    }
    order.status=status;
    console.log(order)
    await order.save()
}

const getOrder=async()=>{
    const orders = await Order.find({});
    return orders;
}

const getOrderById=async(orderid)=>{
    const order=await Order.findById({_id: orderid})
    if(!order){
        throw new Error ("No such order placed!")
    }
    return order;
}

export default {addOrder,getAllOrder,getOrderById,cancel,updateStatus,getOrder,getOrderByIdUser};