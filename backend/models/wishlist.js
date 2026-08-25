import mongoose from "mongoose";

const wishlistSchema=new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        items: [{
            product: {
                type: mongoose.Schema.Types.ObjectId
            }
        }],
    },{
        timestamps: true
    }
)

const Wishlist=mongoose.model('wishlist',wishlistSchema)
export default Wishlist