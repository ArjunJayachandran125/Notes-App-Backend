const asyncHandler = require("express-async-handler");
const Notes = require("../models/notesModel");

// @desc Create note
// @route POST /api/notes
// @access Public
const createNote = asyncHandler(async (req,res) => {
    const {title, body, summary} = req.body;
    if(!title || !body){
        res.status(400);
        throw new Error("Title and body are compulsory");
    }
    const note = await Notes.create({
        title,
        body,
        summary: summary || "",
        user: req.user._id,
    });
    res.status(201).json({
        message: "Note created successfully",
        note,
    });
});

// @desc read all notes
// @route GET /api/notes
// @access Private
const getUserNotes = asyncHandler(async (req,res) => {
    const userId = req.user ? req.user._id : "68f502a223661ec817cee965";
    const notes = await Notes.find({user: userId}).sort({createdAt: -1});
    res.status(200).json({
        message: "All notes extracted",
        count: notes.length,
        notes,
    });
});

// @desc read note with id
// @route GET /api/notes/:id
// @access Private
const getNoteWithId = asyncHandler(async (req,res) => {
    const note = await Notes.findById(req.params.id);
    if(!note){
        res.status(404);
        throw new Error("Note with this Id does not exist");
    }
    res.status(200).json({
        message: `Got note with id ${req.params.id}`,
        note,
    })
});

// @desc update note with id
// @route PUT /api/notes/:id
// @access Private
const updateNoteWithId = asyncHandler(async(req,res) => {
    const {title,body,summary} = req.body;
    const updatedNote = await Notes.findOneAndUpdate({_id: req.params.id, user: req.user._id}, {
        title,
        body,
        summary,
    }, {new: true, runValidators: true});
    if(!updatedNote){
        res.status(404);
        throw new Error("Either note does not exist or you are forbidden");
    }
    res.status(201).json({
        message: `Updated note with id: ${req.params.id} successfully`,
        updatedNote,
    });
});

// @desc delete note with id
// @route DELETE /api/notes/:id
// @access Private
const deleteNoteWithId = asyncHandler(async(req,res) => {
    const deleteNote = await Notes.findOneAndDelete({
        _id: req.params.id, 
        user: req.user._id,
    });
    if(!deleteNote){
        res.status(404);
        throw new Error("Either note does not exist or you are forbidden");
    }
    res.status(200).json({
        message: "Note deleted successfully",
        note: deleteNote,
    });
});

module.exports = {createNote,getUserNotes,getNoteWithId,updateNoteWithId,deleteNoteWithId};