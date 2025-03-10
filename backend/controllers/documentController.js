const Document = require("../models/Document");
const extractTextFromImage = require("../utils/ocr");

// Upload Document and Extract Text
const uploadDocument = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: "No file uploaded" });

        // Extract text using OCR
        const extractedText = await extractTextFromImage(req.file.path);

        // Save document details in MongoDB
        const document = new Document({
            user: req.user.id,
            filename: req.file.originalname,
            fileUrl: req.file.path, // Cloudinary URL
            extractedText,
        });

        await document.save();

        res.status(201).json({ message: "Document uploaded successfully", document });
    } catch (error) {
        console.error("Upload Error:", error);
        res.status(500).json({ message: "Error processing document" });
    }
};

module.exports = { uploadDocument };
