import Product from "../models/product.js"

const add=async({name,description,price,stock,images,category,subcategory,brand})=>{
    const product=new Product({
        name,
        description,
        price,
        stock,
        images,
        category,
        subcategory,
        brand
    })

    await product.save();
    return product;
}

const getall=async ()=>{
    const productList=await Product.find();
    return productList;
}

const getById=async(id)=>{
    const product=await Product.findOne({_id: id})
    return product;
}

export default { add,getall,getById };