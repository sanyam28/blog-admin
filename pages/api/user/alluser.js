import User from "@/models/User"
import dbConnect from "@/middleware/mongoose"

const handler = async (req, res) => {
    await dbConnect()
    let users = await User.find()
    res.status(200).json({users})
  }

export default handler;
  