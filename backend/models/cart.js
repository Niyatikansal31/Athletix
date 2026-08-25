import mongoose from "mongoose";

const cartSchema=new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        items: [{
            product: {
                type: mongoose.Schema.Types.ObjectId
            },
            quantity: {
                type: Number,
                min: [0,'quantity can never be zero'],
                required: true,
                default: 0
            }
        }],
    },{
        timestamps: true
    }
)

const Cart=mongoose.model('cart',cartSchema)
export default Cart;