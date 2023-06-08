import User from "@/models/User";
import dbConnect from "@/middleware/mongoose";
import resetpassword from "@/models/resetpassword";
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        await dbConnect()
        if(req.body){
            const resetpasswordmodel = await resetpassword.findOneAndDelete({reset_token: req.body.usertoken})
            const userdata = await User.findById(req.body.userid)
            if(resetpasswordmodel || userdata){
                var newpassword = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString();
                const userdataupdate = await User.findByIdAndUpdate(req.body.userid, {
                    password: newpassword
                })
                if(userdataupdate){
                    res.status(200).json({ success: "Password updated successfully" })
                }
                else{
                    res.status(400).json({error: "Error occurred, try again later"})
                }
            }
        }
        else{
            res.status(400).json({error: "Error occurred, try again later"})
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
