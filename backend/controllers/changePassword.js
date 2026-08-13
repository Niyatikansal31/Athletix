import authService from "../services/authService.js"
import bcrypt from "bcryptjs"
import User from "../models/user.js";
import STATUS_CODES from "../utils/StatusCodes.js";

const changePassword = async (req, res) => {
    try {
        const { oldpassword, newpassword } = req.body;
        if(!oldpassword || !newpassword){
            res.STATUS_CODES.BAD_REQUEST.json({
                msg: "Enter password!"
            })
            return;
        }
        const user=await User.findOne({mobileNumber: String(req.userPhone)})
        await authService.changePassword(
            oldpassword,
            newpassword,
            user
        );

        res.STATUS_CODES.OK.json({
            msg: "Password Changed!"
        });
    } catch (err) {
        res.STATUS_CODES.INTERNAL_SERVER_ERROR.json({
            msg: err.message
        });
    }
};

export default changePassword;