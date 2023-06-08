import User from "../../../models/User"
import dbConnect from "../../../middleware/mongoose"
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
    if (req.method == 'POST') {
        await dbConnect()
        for (let i = 0; i < req.body.length; i++) {
            var enpass = CryptoJS.AES.encrypt(req.body[i].password, process.env.SECRET_KEY).toString();
            let user = new User({
                name: req.body[i].name,
                username: req.body[i].username,
                email: req.body[i].email,
                password: enpass,
                image: req.body[i].image
            })
            await user.save()
        }
        res.status(200).json({ success: "User added successfully" })
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
