const { z } = require("zod");

const chatSchema = z.object({
    question: z
        .string()
        .trim()
        .min(3, "Question must be at least 3 characters long.")
        .max(500, "Question is too long.")
});

module.exports = {
    chatSchema
};