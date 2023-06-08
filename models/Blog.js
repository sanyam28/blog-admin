const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: {type: String, required: true},
    slug: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    body: {type: String, required: true},
    image: {type: String, required:true},
    image_public_id: {type: String, required:true}
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model("Blog", BlogSchema);