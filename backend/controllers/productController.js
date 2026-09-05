import productService from "../services/productService.js";
import STATUS_CODES from "../utils/StatusCodes.js";

const createProduct=async(req,res)=>{
    const {name,description,price,stock,images,category,subcategory,brand}=req.body;

    if(!name || !description || !price || !stock || !images || !category || !subcategory){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Enter all feilds!"
        })
        return
    }

    try{
        const product=await productService.add(req.body);
        res.status(STATUS_CODES.CREATED).json({
            msg: "Product Added Successfully!"
        })

    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}


const getAllProduct=async(req,res)=>{
    try{
        const productList=await productService.getall();
        res.status(STATUS_CODES.OK).json({
            products: productList
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}


const getById=async(req,res)=>{
    const id=req.params.id
    try{
        const product=await productService.getById(id);
        res.status(STATUS_CODES.OK).json({
            product: product
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const updateProduct=async(req,res)=>{
    const id=req.params.id;
    const {name,description,price,stock,images,category,subcategory,brand}=req.body;
    const allowedFields = [
        "name",
        "description",
        "price",
        "stock",
        "images",
        "category",
        "subcategory",
        "brand"
    ];

    const hasUpdate = Object.keys(req.body).some((key) =>
        allowedFields.includes(key)
    );

    if (!hasUpdate) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Update at least 1 field!"
        });
    }
    try{
        const product=await productService.update(req.body,id);
        res.status(STATUS_CODES.OK).json({
            msg: "Updated Successfully!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const deleteProduct=async(req,res)=>{
    const id=req.params.id
    try{
        await productService.deleteProduct(id);
        res.status(STATUS_CODES.OK).json({
            msg: "Product Sucessfully deleted!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}



export {createProduct,getAllProduct,getById,updateProduct,deleteProduct};