const axios = require("axios");

async function generateAnswer(prompt) {

    const response = await axios.post(
        `${process.env.OLLAMA_URL}/api/generate`,
        {
            model: process.env.CHAT_MODEL,
            prompt,
            stream: false
        }
    );

    return response.data.response;
}

module.exports = {
    generateAnswer
};