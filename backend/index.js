import express from "express";
import connectDB from "../backend/config/db.js"
import * as dotenv from 'dotenv';
dotenv.config();
import AuthRoute from "./routes/authRoutes.js";
import ProductRoute from "./routes/productRoutes.js";
import CartRoute from "./routes/cartRoutes.js";
import OrderRoute from "./routes/orderRoutes.js";

const app=express();
app.use(express.json());

app.use('/api/v1/auth',AuthRoute)
app.use('/api/v1/products',ProductRoute)
app.use('/api/v1/cart',CartRoute)
app.use('/api/v1/order',OrderRoute)

connectDB();
app.listen(process.env.PORT,()=>{
    console.log("Backend is running!");
})