import express from "express"
import authMiddleware from "../middlewares/authMidlleware.js"
import { deactivate, get, update } from "../controllers/profileController.js"
const router=express.Router()

router.get('/',authMiddleware,get)
router.patch('/',authMiddleware,update)
router.patch('/deactivate',authMiddleware,deactivate)

const profileRouter=router
export default profileRouter