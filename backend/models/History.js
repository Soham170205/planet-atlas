const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema({
    civilization: {
        type: String,
        required: true
    },

    section: {
        type: String,
        required: true
    },

    paragraph: {
        type: String,
        required: true
    },

    embedding: {
        type: [Number],
        default: []
    }
});

module.exports = mongoose.model("History", HistorySchema);