import mongoose from "mongoose";

const productSchema=new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        stock: {
            type: Number,
            required: true,
            default: 0
        },
        images: {
            type: [String],
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: [
                "Cricket",
                "Badminton",
                "Football",
                "Basketball",
                "Tennis",
                "Volleyball",
                "Table Tennis",
                "Hockey",
                "Athletics",
                "Fitness"
            ]
        },
        subcategory: {
            type: String,
            required: true,
            enum: [
                "Equipment",
                "Apparel",
                "Footwear",
                "Protective Gear",
                "Accessories"
            ]
        },
        brand: {
            type: String
        },
        rating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        returnable: {
            type: Boolean,
            default: true
        },
        exchangeable: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true
    }
)

const Product=mongoose.model('product',productSchema)
export default Product;