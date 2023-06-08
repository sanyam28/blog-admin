const mongoose = require('mongoose');

const ResetpasswordSchema = new mongoose.Schema({
    userid: {type: String, required: true},
    reset_token: {type: String, required: true},
    expireAt: {
        type: Date,
        default: Date.now,
        index: { expires: "1d" },
      },
}, {timestamps: true});

mongoose.models = {}
export default mongoose.model("Reset_Password", ResetpasswordSchema);