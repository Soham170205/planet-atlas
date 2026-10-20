const { generateEmbedding } = require("../services/embeddingService");
const { retrieveRelevantParagraphs } = require("../services/retrievalService");
const { buildPrompt } = require("../services/promptService");
const { generateAnswer } = require("../services/llmService");

async function askQuestion(req, res, next) {

    try {

        const { question } = req.body;

        console.log("Question:", question);

        const questionEmbedding = await generateEmbedding(question);

        console.log("Embedding:", questionEmbedding.length);

        // this is the new controller that accepts 2 arguments
        // first arg -> is the vector used for similarity ranking
        // second -> tghe original question which allows the service to identify explicitly mentioned civilizxation names
        const topResults =
            await retrieveRelevantParagraphs(questionEmbedding, question);

        // temorary test
        console.log("QUESTION:", question);

        console.log(
            "RETRIEVED RESULTS:",
            topResults.map((item) => ({
                civilization: item.civilization,
                section: item.section,
                score: item.score
            }))
        );
        topResults.forEach(item => {

            console.log(
                item.civilization,
                item.section,
                item.score
            );

        });

        // test 2
        console.log("\n========== RETRIEVAL DEBUG ==========");
        console.log("Question:", question);

        topResults.forEach((item, index) => {
            console.log(`\n--- Source ${index + 1} ---`);
            console.log("Civilization:", item.civilization);
            console.log("Section:", item.section);
            console.log("Score:", item.score);
            console.log("Paragraph:", item.paragraph);
        });

        console.log("========== END RETRIEVAL DEBUG ==========\n");

        const prompt = buildPrompt(question, topResults);

        const answer = await generateAnswer(prompt);

        res.json({

            success: true,

            answer,

            sources: topResults.map(item => ({

                civilization: item.civilization,

                section: item.section,

                score: item.score

            }))

        });

    }

    catch (error) {
        next(error);
    }
}

module.exports = {
    askQuestion
};