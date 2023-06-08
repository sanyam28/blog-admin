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
        const blog = await Blog.findById(req.body.blogid)
        if (blog) {
            if (req.body.image != false) {
                const imagedestroy = await cloudinary.uploader.destroy(blog.image_public_id)
                if (imagedestroy) {

                    const Imageupload = file => cloudinary.uploader.upload(file)
                    const cfile = req.body.image
                    const imageuploaded = await Imageupload(cfile)
                    const ublog = await Blog.findByIdAndUpdate(req.body.blogid, {
                        title: req.body.title,
                        slug: req.body.slug,
                        description: req.body.description,
                        body: req.body.body,
                        image: imageuploaded.secure_url,
                        image_public_id: imageuploaded.public_id
                    })
                    if (ublog) {
                        res.status(200).json({ success: "Blog updated successfully" })
                    }
                    else {
                        res.status(400).json({ error: "Blog not found" })
                    }
                }
                else {
                    res.status(200).json({ error: "Internal Image Server error occured" })
                }
            }
            else {
                const ublog = await Blog.findByIdAndUpdate(req.body.blogid, {
                    title: req.body.title,
                    slug: req.body.slug,
                    description: req.body.description,
                    body: req.body.body,
                    // image: imageuploaded.secure_url,
                    // image_public_id: imageuploaded.public_id
                })
                if (ublog) {
                    res.status(200).json({ success: "Blog updated successfully" })
                }
                else {
                    res.status(200).json({ error: "Blog not found" })
                }
            }
        }
    }
    else {
        res.status(400).json({ error: "This method is not allowed" })
    }
}

export default handler;
