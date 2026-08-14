import express from "express";

const router=express.Router();
import authMiddleware from "../middlewares/authMidlleware.js";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";
import {createProduct,getAllProduct,getById} from "../controllers/productController.js";

router.post('/',authMiddleware,authorizeAdmin,createProduct);
router.get('/',getAllProduct);
router.get('/:id',getById)


const ProductRoute=router
export default ProductRoute;