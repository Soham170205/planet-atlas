const express = require("express");

const router = express.Router();

const { askQuestion } = require("../controllers/chatController");

//validates every request before the controller runs
const validate = require("../middleware/validate");
const { chatSchema } = require("../validators/chatValidator");

router.post(
    "/",
    validate(chatSchema),
    askQuestion
);

module.exports = router;

















// const express = require("express");
// const router = express.Router();
// const axios = require("axios"); //required for question embedding
// const History = require("../models/History");
// const cosineSimilarity = require("../utils/cosineSimilarity"); //importing cosine similarity

// router.post("/", async (req, res) => {
//     try {
//         const { question } = req.body;

//         console.log("Question:", question);

//         // Generate embedding for the question
//         const response = await axios.post(
//             "http://localhost:11434/api/embed",
//             {
//                 model: "nomic-embed-text",
//                 input: question
//             }
//         );

//         const questionEmbedding = response.data.embeddings[0];

//         console.log("Question Embedding:", questionEmbedding.length);

//         // Load all history documents
//         const history = await History.find();
//         //comparing every document - compares with each score 
//         const results = history.map(item => {

//             const score = cosineSimilarity(
//                 questionEmbedding,
//                 item.embedding
//             );

//             return {
//                 ...item.toObject(),
//                 score
//             };

//         });
//         //sorting results by similarity
//         results.sort((a, b) => b.score - a.score);
//         //picking top results from that - put highest score first - top 5
//         const topResults = results.slice(0, 5);
//         //verifying top results
//         topResults.forEach(item => {

//             console.log(
//                 item.civilization,
//                 item.section,
//                 item.score
//             );

//         });
//         //convert paras to one block of text
//         const context = topResults
//             .map(item => item.paragraph)
//             .join("\n\n");

//         //generating the actual prompt for ollama    
//         const prompt = `
//             You are Planet Atlas, an expert history assistant.

//             Use ONLY the context below to answer the user's question.

//             If the answer is not contained in the context, say:

//             "I don't have enough historical information."

//             Context:

//             ${context}

//             Question:

//             ${question}

//             Answer:
//             `; 

//         //sending prompt to llama 3.2
//         const aiResponse = await axios.post(
//             "http://localhost:11434/api/generate",
//             {
//                 model: "llama3.2",
//                 prompt,
//                 stream: false
//             }
//         );

//         //answer from llama stored here
//         const answer = aiResponse.data.response;

//         console.log("Documents:", history.length);

//         //returning to react
//         res.json({

//             success: true,
        
//             answer,
        
//             sources: topResults.map(item => ({
//                 civilization: item.civilization,
//                 section: item.section,
//                 score: item.score
//             }))
        
//         });

//     } catch (error) {
//         console.error(error);

//         res.status(500).json({
//             success: false,
//             message: error.message
//         });
//     }
// });

// module.exports = router;