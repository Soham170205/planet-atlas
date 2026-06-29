const express = require("express");
const cors = require("cors");
require("dotenv").config();
const chatRoutes = require("./routes/chat");
const historyRoutes = require("./models/History");

console.log(process.env.MONGO_URI);
const connectDB = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/History", historyRoutes);
app.use("/api/chat", chatRoutes);

connectDB();


app.get("/", (req, res) => {
    res.send("Planet Atlas Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});