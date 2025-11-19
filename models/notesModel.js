const mongoose = require("mongoose");
const User = require("./userModel");

const noteSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, "Enter title of the note"]
    },
    body: {
        type: String,
        required: [true, "Enter the body of your note"]
    },
    summary: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Enter user Id"]
    },
    file: {
        type: String
    }
}, {timestamps: true});

const Note = mongoose.model("Note",noteSchema);
module.exports = Note;