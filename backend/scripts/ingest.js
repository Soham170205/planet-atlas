const mongoose = require("mongoose"); // database
const dotenv = require("dotenv"); //to read env
const fs = require("fs"); // open history.json
const path = require("path"); // finding the file

dotenv.config();

const connectDB = require("../config/database");
const History = require("../models/History"); // our mongo model

//reading the JSON 
const historyPath = path.join(__dirname, "../data/history.json");
//historyData is a js array here
const historyData = JSON.parse(
    fs.readFileSync(historyPath, "utf8")
);


//import function creation - connecting to mongo is asynchronous
const importData = async () => {
    try {
        //connect to DB
        await connectDB();

        //clear existing data - if any 
        await History.deleteMany();

        //insert everything
        await History.insertMany(historyData);

        //success or not
        console.log("✅ History imported successfully!");

        mongoose.connection.close();
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
};

importData();