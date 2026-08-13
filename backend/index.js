import express from "express";
import connectDB from "../backend/config/db.js"
import * as dotenv from 'dotenv';
dotenv.config();
import UserRoute from "./routes/authRoutes.js";

const app=express();
app.use(express.json());

app.use('/user',UserRoute)

connectDB();
app.listen(process.env.PORT,()=>{
    console.log("Backend is running!");
})