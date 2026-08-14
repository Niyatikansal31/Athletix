import express from "express";
import connectDB from "../backend/config/db.js"
import * as dotenv from 'dotenv';
dotenv.config();
import AuthRoute from "./routes/authRoutes.js";
import ProductRoute from "./routes/productRoutes.js";

const app=express();
app.use(express.json());

app.use('/api/v1/auth',AuthRoute)
app.use('/api/v1/products',ProductRoute)

connectDB();
app.listen(process.env.PORT,()=>{
    console.log("Backend is running!");
})