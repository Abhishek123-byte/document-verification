const express = require("express");
const { uploadDocument } = require("../controllers/documentController");
const upload = require("../utils/multer");
const authMiddleware = require("../middleware/authMiddleware"); // JWT auth
const router = express.Router();

router.post("/upload", authMiddleware, upload.single("document"), uploadDocument);

module.exports = router;
