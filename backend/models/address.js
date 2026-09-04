import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        name: {
            type: String,
            required: true
        },

        phone: {
            type: String,
            required: true,
            validate: {
                validator: function (phone) {
                    return /^[6-9]\d{9}$/.test(phone);
                },
            message: (props) => `${props.value} is not a valid phone number!`,
            }
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
            required: true,
            match: [/^[0-9]{6}$/, "Pincode must be 6 digits"]
        },

        label: {
            type: String,
            enum: [
                "HOME",
                "WORK",
                "COLLEGE"
            ],
            required: true
        },

        isDefault: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

const Address = mongoose.model("Address", addressSchema);
export default Address;