import express from "express"
import authMiddleware from "../middlewares/authMidlleware.js";
import {addOrder, cancel, getAllOrder, getOrderAdmin, getOrderById, getOrderByIdUser, updateStatus} from "../controllers/orderController.js"
import authorizeAdmin from "../middlewares/authorizeAdmin.js";
const router=express.Router()

router.post('/',authMiddleware,addOrder);
router.get('/',authMiddleware,getAllOrder);
router.get('/:id',authMiddleware,getOrderByIdUser)
router.patch('/:orderid',authMiddleware,cancel);
router.patch('/admin/:orderid',authMiddleware,authorizeAdmin,updateStatus);
router.get('/admin/',authMiddleware,authorizeAdmin,getOrderAdmin);
router.get('/admin/:id',authMiddleware,authorizeAdmin,getOrderById);

const OrderRoute=router
export default OrderRoute;