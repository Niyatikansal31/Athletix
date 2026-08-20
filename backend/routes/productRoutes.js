import express from "express";

const router=express.Router();
import authMiddleware from "../middlewares/authMidlleware.js";
import authorizeAdmin from "../middlewares/authorizeAdmin.js";
import {createProduct,getAllProduct,getById,updateProduct, deleteProduct} from "../controllers/productController.js";

router.post('/',authMiddleware,authorizeAdmin,createProduct)
router.get('/',getAllProduct)
router.get('/:id',getById)
router.patch('/:id',authMiddleware,authorizeAdmin,updateProduct)
router.delete('/:id',authMiddleware,authorizeAdmin,deleteProduct)


const ProductRoute=router
export default ProductRoute;