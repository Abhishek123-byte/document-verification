const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const documentRoutes = require("./routes/documentRoutes");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", authRoutes);
app.use("/api/documents", documentRoutes);

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
