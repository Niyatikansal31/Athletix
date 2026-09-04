import addressService from "../services/addressService.js";
import STATUS_CODES from "../utils/StatusCodes.js";

const add=async(req,res)=>{
    const {name, phone, street, city, state, pincode, label, isDefault}=req.body
    const userPhone=req.userPhone;

    if(!name || !phone || !street || !city || !state || !pincode || !label){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Enter all fields!"
        })
    }

    try{
        await addressService.add(userPhone,name, phone, street, city, state, pincode, label, isDefault)
        res.status(STATUS_CODES.CREATED).json({
            msg: "Address Added Successfully!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}


const get=async(req,res)=>{
    const userPhone=req.userPhone
    try{
        const address=await addressService.getAllAddress(userPhone)
        res.status(STATUS_CODES.OK).json({
            address: address
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}


const getById=async(req,res)=>{
    const id=req.params.id

    if(!id){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Enter id!"
        })
    }
    try{
        const address=await addressService.getById(id)
        res.status(STATUS_CODES.OK).json({
            address: address
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}


const deleteById=async(req,res)=>{
    const id=req.params.id

    if(!id){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Enter id!"
        })
    }
    try{
        const address=await addressService.deleteById(id)
        res.status(STATUS_CODES.OK).json({
            msg: "Deleted successfully!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}

const update = async (req, res) => {
    const id = req.params.id;
    
    const {name,phone,street,city,state,pincode,label} = req.body;
    
    if (!id) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Enter id!"
        });
    }
    
    if ( name === undefined && phone === undefined && street === undefined && city === undefined && state === undefined && pincode === undefined && label === undefined) {
        return res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Enter at least one field to update!"
        });
    }
    

    try {
        await addressService.update(
            id,
            {
                name,
                phone,
                street,
                city,
                state,
                pincode,
                label
            }
        );

        res.status(STATUS_CODES.OK).json({
            msg: "Address Updated Successfully!"
        });

    } catch (err) {
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        });
    }
};

const setDefault=async(req,res)=>{
    const userPhone=req.userPhone
    const id=req.params.id

    if(!id){
        res.status(STATUS_CODES.BAD_REQUEST).json({
            msg: "Enter id!"
        })
    }
    try{
        const address=await addressService.setDefault(userPhone,id)
        res.status(STATUS_CODES.OK).json({
            msg: "Succesfully Updated!"
        })
    }catch(err){
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({
            msg: err.message
        })
    }
}
export {add,get,getById,deleteById,update,setDefault}