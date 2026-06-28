const express = require("express");
const cors = require("cors");
require("dotenv").config();

console.log(process.env.MONGO_URI);
const connectDB = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
    res.send("Planet Atlas Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});