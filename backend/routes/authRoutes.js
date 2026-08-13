import express from "express";
import signUp from "../controllers/signup.js"
import logIn from "../controllers/logIn.js";
import authMiddleware from "../middlewares/authMidlleware.js";
import changePassword from "../controllers/changePassword.js";

const router=express.Router();

router.post('/signup',signUp);
router.post('/login',logIn);
router.post('/changepassword',authMiddleware,changePassword);

const UserRoute=router
export default UserRoute;