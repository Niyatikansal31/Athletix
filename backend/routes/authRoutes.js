import express from "express";
import {signUp,logIn,changePassword} from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMidlleware.js";

const router=express.Router();

router.post('/signup',signUp);
router.get('/login',logIn);
router.post('/changepassword',authMiddleware,changePassword);

const AuthRoute=router
export default AuthRoute;