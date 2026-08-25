import mongoose from "mongoose";
const reviewSchema=new Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        product: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: [1,"Rating cannot be less than 1"],
            max: [5,"Rating cannot be more than 5"],
        },
        comment: {
            type: String,
            maxLength: 500
        },
    },
    {
        timestamps: true
    }
)

const Review=mongoose.model('reviews',reviewSchema)
export default Review