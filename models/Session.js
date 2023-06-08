const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
    userid: {type: String, required: true},
    token: {type: String, required: true},
    // expiresat: { type: Date, expires: '2m', default: Date.now }
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: "2d" },
      },
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model("Session", SessionSchema);