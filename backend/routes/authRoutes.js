import express from "express";
import {signUp,logIn,changePassword, reactivate} from "../controllers/authController.js"
import authMiddleware from "../middlewares/authMidlleware.js";

const router=express.Router();

router.post('/signup',signUp);
router.get('/login',logIn);
router.post('/changepassword',authMiddleware,changePassword);
router.patch('/reactivate',reactivate);

const AuthRoute=router
export default AuthRoute;