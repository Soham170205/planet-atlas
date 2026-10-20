const axios = require("axios");

async function generateEmbedding(question) {

    const response = await axios.post(
        `${process.env.OLLAMA_URL}/api/embed`,
        {
            model: process.env.EMBED_MODEL,
            input: question
        }
    );

    return response.data.embeddings[0];
}

module.exports = {
    generateEmbedding
};