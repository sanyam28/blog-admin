import Blog from "../../models/Blog"
import dbConnect from "../../middleware/mongoose"

const cloudinary = require('cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const handler = async (req, res) => {
    if (req.method == 'POST') {
        await dbConnect()
        const suc = await Blog.findById(req.body.blogid)
        const imagedestroy = await cloudinary.uploader.destroy(suc.image_public_id)
        if (imagedestroy) {

            const ublog = await Blog.findByIdAndDelete(req.body.blogid)
            if (ublog) {
                res.status(200).json({ success: "Blog Deleted successfully" })
            }
            else {
                res.status(200).json({ error: "Blog not found" })
            }

        } else {
            res.status(200).json({ error: "Blog not found" })
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
