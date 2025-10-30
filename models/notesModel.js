const mongoose = require("mongoose");
const User = require("./userModel");

const notesSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter the title for your note"],
        maxLength: 100,
    },
    body: {
        type: String,
        required: [true, "Enter your body"],
        maxLength: 500,
    },
    summary: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Enter your UserID"],
    },
}, {timestamps: true});

const Notes = mongoose.model("Notes", notesSchema);
module.exports = Notes;