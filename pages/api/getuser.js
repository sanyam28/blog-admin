import User from "../../models/User"
import Session from "../../models/Session"
import dbConnect from "../../middleware/mongoose"
var jwt = require('jsonwebtoken')

const handler = async (req, res) => {
    if (req.method == 'POST') {
        await dbConnect()
        const user = await User.findOne({_id: req.body.verifyjwt.userid, username: req.body.verifyjwt.identitiy, email: req.body.verifyjwt.email})
        if(user){
            const usersession = await Session.findOne({userid: req.body.verifyjwt.userid, token: req.body.jwttoken})
            if(!usersession){
                
                res.json({ "error": "Invalid User" })
            }
            else{
                res.status(200).json({ "success": "no" })
            }
        }
        else{
            res.json({ "error": "Invalid User" })
        }
    }
    else {
        res.json({ "error": "fakerequest" })
    }
}

export default handler;
