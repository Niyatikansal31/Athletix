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
    if (!product) {
        throw new Error("404 Product Not Found");
    }  
    return product;
}

const update = async (updateData, id) => {
    const {name,description,price,stock,images,category,subcategory,brand,rating,reviews} = updateData;

    if (rating !== undefined || reviews !== undefined) {
        throw new Error("Admin Cannot change rating and reviews.");
    }

    if (price !== undefined && price <= 0) {
        throw new Error("Price should atleast be greater than 0.");
    }

    if (
        stock !== undefined &&
        (stock < 0 || !Number.isInteger(stock))
    ) {
        throw new Error("Stock cannot be negative or non integer.");
    }

    if (category !== undefined) {
        const enumValues = Product.schema.path("category").enumValues;

        const isCategoryValid = enumValues.includes(category);

        if (!isCategoryValid) {
            throw new Error("Enter a valid category");
        }
    }

    if (subcategory !== undefined) {
        const enumValues = Product.schema.path("subcategory").enumValues;

        const isSubCategoryValid = enumValues.includes(subcategory);

        if (!isSubCategoryValid) {
            throw new Error("Enter a valid subcategory");
        }
    }

    const product = await getById(id);

    if (!product) {
        throw new Error("404 Product Not Found");
    }

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

    const updateFields = Object.keys(updateData).filter((key) =>
        allowedFields.includes(key)
    );


    const updates = {};

    updateFields.forEach((key) => {
        updates[key] = updateData[key];
    });

    const updatedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: updates },
        {
            new: true,
            runValidators: true
        }
    );
    return updatedProduct;
};

const deleteProduct=async(id)=>{
    const product = await getById(id);
    if (!product) {
        throw new Error("404 Product Not Found");
    }   
    await Product.deleteOne({_id: id})

    return;
}

export default { add,getall,getById,update,deleteProduct };