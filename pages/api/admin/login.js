import User from "../../../models/User"
import Session from "../../../models/Session";
import dbConnect from "../../../middleware/mongoose"
var jwt = require('jsonwebtoken');
var CryptoJS = require("crypto-js");


const handler = async (req, res) => {
    if (req.method == 'POST') {
        await dbConnect()

        let user = await User.findOne({ "email": req.body.email })

        if (user) {
            var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
            var originalpassword = bytes.toString(CryptoJS.enc.Utf8);
            if (req.body.email == user.email && req.body.password == originalpassword) {
                var token = jwt.sign({ userid: user._id, identitiy: user.username, email: user.email, name: user.name }, process.env.SECRET_KEY, {
                    expiresIn: "2d"
                });
                let session = new Session({
                    userid: user._id,
                    token: token
                })
                await session.save()
                if(process.env.SESSION == 'PRODUCTION'){
                    console.log('hello1')
                    let nodemailer = require('nodemailer')
                    const transporter = nodemailer.createTransport({
                        port: 465,
                        host: "smtp.gmail.com",
                        auth: {
                          user: process.env.EMAIL_HOST_USER,
                          pass: process.env.EMAIL_HOST_PASSWORD,
                        },
                        secure: true,
                      })
                      const mailData = {
                        from: process.env.EMAIL_HOST_USER,
                        to: process.env.EMAIL_TO_USER,
                        subject: `New Login`,
                        html: `<div><p style="text-align: center;"><span style="font-size: 36pt; color: rgb(224, 62, 45);"><strong>New Login</strong></span></p><p>&nbsp;</p><p>Some one has tried to access your account, change your password immediately,</p><p>if you have tried to log in.</p><p>Kindly Ignore this mail.</p></div>`,
                        // html: <div>Someone is tried to access your account, if it yours so kindly ignore this if not change your password immediately. Thank You from Next Js Server</div>
                       }
                       transporter.sendMail(mailData, function (err, info) {
                        if(err)
                          console.log(err)
                        else
                          console.log(info)
                      })
                }
                res.status(200).json({ success: true, token, username: user.username, email: user.email })
            }
            else {
                res.status(200).json({ success: false, error: "Invalid Crediantials" })
            }
        }
        else {
            res.status(200).json({ success: false, error: "Invalid Crediantials" })
        }

    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
