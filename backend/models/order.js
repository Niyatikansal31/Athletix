import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },

                quantity: {
                    type: Number,
                    min: [1, "quantity must be at least 1"],
                    required: true
                },

                price: {
                    type: Number,
                    min: [0, "price can never be negative"],
                    required: true
                },

                returnable: {
                    type: Boolean,
                    default: true
                },

                exchangeable: {
                    type: Boolean,
                    default: true
                }
            }
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: [0, "Amount can never be negative"]
        },
        address: {
            name: {
                type: String,
                required: true
            },

            phone: {
                type: String,
                required: true
            },

            street: {
                type: String,
                required: true
            },

            city: {
                type: String,
                required: true
            },

            state: {
                type: String,
                required: true
            },

            pincode: {
                type: String,
                required: true
            }
        },
        status: {
            type: String,
            enum: [
                "confirmed",
                "packed",
                "shipped",
                "out_for_delivery",
                "delivered",
                "cancelled"
            ],
            default: "confirmed"
        },
        paymentMode: {
            type: String,
            enum: [
                "Cash On Delivery",
                "Net Banking",
                "UPI",
                "Credit Card/Debit Card"
            ],
            required: true
        }
    },
    {
        timestamps: true
    }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;