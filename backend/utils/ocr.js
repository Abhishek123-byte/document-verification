const Tesseract = require("tesseract.js");

const extractTextFromImage = async (imagePath) => {
    try {
        const { data: { text } } = await Tesseract.recognize(imagePath, "eng", {
            logger: (m) => console.log(m), // Logs progress
        });
        return text;
    } catch (error) {
        console.error("OCR Error:", error);
        throw new Error("Error extracting text from document");
    }
};

module.exports = extractTextFromImage;
