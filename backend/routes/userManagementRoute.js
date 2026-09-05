import express from "express"
import authorizeAdmin from "../middlewares/authorizeAdmin.js"
import { deactivate, getAllUsers, getById, reactivate, deleteById } from "../controllers/userMagnagement.js"
import authMiddleware from "../middlewares/authMidlleware.js"

const router=express.Router()

router.get('/admin/',authMiddleware,authorizeAdmin,getAllUsers)
router.get('/admin/:id',authMiddleware,authorizeAdmin,getById)
router.patch('/admin/deactivate/:id',authMiddleware,authorizeAdmin,deactivate)
router.patch('/admin/reactivate/:id',authMiddleware,authorizeAdmin,reactivate)
router.delete('/admin/delete/:id',authMiddleware,authorizeAdmin,deleteById)

const userManagementRoute=router
export default userManagementRoute