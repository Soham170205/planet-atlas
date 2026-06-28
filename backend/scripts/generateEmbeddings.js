const mongoose = require("mongoose");
const dotenv = require("dotenv");
const axios = require("axios"); // hhtp request to ollama

dotenv.config();

const connectDB = require("../config/database");
const History = require("../models/History");


//actual function to generate the embeddings 
const generateEmbeddings = async () => {
    try {

        //connect to mongo
        await connectDB();

        //find history
        const history = await History.find();

        for (const item of history) {
            console.log(item.paragraph);
            const response = await axios.post(
                "http://localhost:11434/api/embed",
                {
                    model: "nomic-embed-text",
                    input: item.paragraph
                }
            );

            item.embedding = response.data.embeddings[0];

            await item.save();

            console.log(
                `✅ ${item.civilization} - ${item.section} (${item.embedding.length} dimensions)`
            );
            //console.log("Embedding length:", response.data.embeddings[0].length);
            // console.log(response.data);
            // break;

            // // Stop after the first paragraph
            // break;
        }

        mongoose.connection.close();

    } catch (error) {
        console.error(error);
    }
};

generateEmbeddings();