import mongoose from "mongoose";

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI); 
        console.log("Database Connected!")   
    }catch(err){
        console.log("Error Connecting the database!")
    }
}

export default connectDB;