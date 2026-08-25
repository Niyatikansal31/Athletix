import express from "express"
import authMiddleware from "../middlewares/authMidlleware.js"
import { add, remove, get, clear } from "../controllers/wishlistController.js"

const route=express.Router()

route.post('/:id',authMiddleware,add)
route.delete('/:id',authMiddleware,remove)
route.get('/',authMiddleware,get)
route.delete('/',authMiddleware,clear)

const wishlistRoute=route
export default wishlistRoute