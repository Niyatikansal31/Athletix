import express, { application } from "express";
import { add,deleteById,get, getById, setDefault, update } from "../controllers/addressController.js";
import authMiddleware from "../middlewares/authMidlleware.js";

const router=express.Router()

router.post('/',authMiddleware,add)
router.get('/',authMiddleware,get)
router.get('/:id',authMiddleware,getById)
router.patch('/:id',authMiddleware,update)
router.patch('/default/:id',authMiddleware,setDefault)
router.delete('/:id',authMiddleware,deleteById)

const AddressRoute=router
export default AddressRoute
