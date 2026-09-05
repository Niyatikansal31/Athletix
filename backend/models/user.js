import mongoose from "mongoose";

const userSchema=mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            lowercase: true,
            validate: {
                validator: function (email) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
                },
                message: (props) => `${props.value} is not a valid email address!`,
            }
        },
        mobileNumber: {
            type: String,
            required: true,
            validate: {
                validator: function (phone) {
                    return /^[6-9]\d{9}$/.test(phone);
                },
            message: (props) => `${props.value} is not a valid phone number!`,
            },
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        dob: {
            type: Date,
            validate: {
                validator: function (value) {
                    return value <= new Date();
                },
                message: 'Date of birth cannot be in the future.'
            },
            required: true
        },
        gender: {
            type: String,
            enum: ['Female','Male','Others']
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        isActive: {
            type: Boolean,
            default: true
        },
        reasonForDeactivation: {
            type: String,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const User=mongoose.model('user',userSchema);
export default User;