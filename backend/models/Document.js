const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
    filename: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String, 
        required: true,
    },
    extractedText: {
        type: String, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Document", DocumentSchema);
