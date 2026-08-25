import express from "express"
import authMiddleware from "../middlewares/authMidlleware.js";
import {add,getMyCart,clear,update,deleteItem} from "../controllers/cartController.js";

const router=express.Router()

router.post('/:productId',authMiddleware,add);
router.get('/',authMiddleware,getMyCart);
router.delete('/',authMiddleware,clear);
router.delete('/:productId',authMiddleware,deleteItem);
router.patch('/:productId',authMiddleware,update);

const CartRoute=router
export default CartRoute;