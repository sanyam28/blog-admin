import User from "../../../models/User"
import resetpassword from "../../../models/resetpassword"
import dbConnect from "../../../middleware/mongoose"
import { randomUUID } from 'crypto'

const handler = async (req, res) => {
    if (req.method == 'POST') {
        console.log(req.body)
        await dbConnect()
        const userexists = await User.findOne({ email: req.body.email })
        var id = randomUUID()
        if (userexists) {
            // checking
            const crepass = await resetpassword.findOne({ userid: userexists._id })
            if (crepass) {
                    let resettoken = crepass.reset_token
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
                        from: {
                            name: `Admin - Sanyam Bucha`,
                            address: process.env.EMAIL_HOST_USER
                        },
                        to: process.env.EMAIL_TO_USER,
                        subject: `Password Reset`,
                        html: `<div><p>You have Requested password reset on Sanyam Admin Panel.</p><p>Password reset url: ${process.env.NEXT_BASE_PUBLIC_URL}/password-reset?token=${resettoken}</p>`,
                    }
                    transporter.sendMail(mailData, function (err, info) {
                        if (err)
                            console.log(err)
                        else
                            console.log(info)
                    })
                    res.status(200).json({ reset_token: crepass.reset_token, crepass })
            }
            else {
                console.log("i arrived here")
                let reset_password = new resetpassword({
                    userid: userexists._id,
                    reset_token: id
                })
                await reset_password.save()
                const ncrepass = await resetpassword.findOne({ userid: userexists._id })
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
                    from: {
                        name: `Admin - Sanyam Bucha`,
                        address: process.env.EMAIL_HOST_USER
                    },
                    to: process.env.EMAIL_TO_USER,
                    subject: `Password Reset`,
                    html: `<div><p>You have Requested password reset on Sanyam Admin Panel.</p><p>Password reset url: ${process.env.NEXT_BASE_PUBLIC_URL}/password-reset?token=${ncrepass.reset_token}</p>`,
                }
                transporter.sendMail(mailData, function (err, info) {
                    if (err)
                        console.log(err)
                    else
                        console.log(info)
                })
                res.status(200).json({ reset_tokena: ncrepass.reset_token, user: ncrepass })
            }
        }
        else {

            res.status(400).json({ error: 'user not found' })
        }

    }
    else {
        res.status(400).json({ error: 'This method is not allowed' })
    }
}

export default handler;
