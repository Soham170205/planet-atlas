
const History = require("../models/History");
const cosineSimilarity = require("../utils/cosineSimilarity");

async function retrieveRelevantParagraphs(
    questionEmbedding,
    question = ""
) {
    //fetch historical records
    const history = await History.find();

    const results = history
        .map((item) => {
            //calculate similarity score 
            const score = cosineSimilarity(
                questionEmbedding,
                item.embedding
            );
            //add the score to each document
            return {
                ...item.toObject(),
                score
            };
        })
        //filter the invalid scores such as NaN or Infinity
        .filter((item) => Number.isFinite(item.score))
        //sort by the score from highest to lowest similarity
        .sort((a, b) => b.score - a.score);

        // protection against an invalid TOP_K
    const parsedTopK = Number(process.env.TOP_K);
    const topK =
        Number.isInteger(parsedTopK) && parsedTopK > 0
            ? parsedTopK
            : 5;

           
    const normalizedQuestion = question.toLowerCase();

    // Find civilization names explicitly mentioned in the question.
    const namedCivilizations = [
        // removes duplicate civlization names
        ...new Set(
            results
            // extract civilization names from db records
                .map((item) => item.civilization)
                // removes missing or invalid names
                .filter(
                    (name) =>
                        typeof name === "string" &&
                        name.trim().length > 0
                )
        )
    ].filter((name) =>
        // .includes -> checks whether the full civilization name appears in the question
         // .toLowerCase() -> makes matching case sensitive
        normalizedQuestion.includes(name.toLowerCase())
    );

    // reserves slot for each civilization
    // selected stores final results
    const selected = [];
    const selectedIds = new Set();

    // addResult -> prevents duplicate documents from being added
    function addResult(item) {
        const id = String(item._id);

        // se3lected.Length < topK -> prevents the selection from exceeding the configured limit
        if (!selectedIds.has(id) && selected.length < topK) {
            selected.push(item);
            selectedIds.add(id);
        }
    }

    // Reserve a slot for the best result from each named civilization.
    for (const civilization of namedCivilizations) {
        const bestMatch = results.find(
            (item) => item.civilization === civilization
        );

        if (bestMatch) {
            addResult(bestMatch);
        }
    }

    // Fill the remaining slots using global similarity ranking.
    for (const item of results) {
        addResult(item);

        if (selected.length >= topK) {
            break;
        }
    }

    return selected;
}

module.exports = {
    retrieveRelevantParagraphs
};
