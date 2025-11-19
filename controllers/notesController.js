const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const Note = require("../models/notesModel");

// @desc Create note
// @route POST api/notes/
// access Private
const createNote = asyncHandler(async(req,res) => {
    const {title,body,summary} = req.body;
    if(!title || !body){
        res.status(400);
        throw new Error("Title and Body are mandatory");
    }
    const note = await Note.create({
        title,
        body,
        summary: summary || "",
        user: req.user._id,
        file: req.file ? req.file.filename : null
    });
    res.status(201).json({
        message: "Note created",
        note
    });
});

// @desc Get all notes of a user
// @route GET api/notes/
// access Private
const getAllNotes = asyncHandler(async(req,res) => {
    const notes = await Note.find({user: req.user._id}).sort({createdAt: -1});
    res.status(200).json({
        message: "successfully fetched all notes",
        count: notes.length,
        notes
    });
});

// @desc Get note with id
// @route POST api/notes/:id
// access Private
const getNote = asyncHandler(async(req,res) => {
    const note = await Note.findOne({user: req.user._id, _id: req.params.id});
    if(!note){
        res.status(404);
        throw new Error("Note doesnt exist or you are not authorized");
    }
    res.status(200).json({
        message: "Note fetched successfully",
        note
    });
});

// @desc Update note with id
// @route PUT api/notes/:id
// access Private
const updateNote = asyncHandler(async(req,res) => {
    const {title,body,summary} = req.body;
    const updatedNote = await Note.findOneAndUpdate({user: req.user._id, _id: req.params.id}, {
        title,
        body,
        summary
    }, {new: true, runValidators: true});
    if(!updatedNote){
        res.status(404);
        throw new Error("Either note doesnt exist or you are unauthorized");
    }
    res.status(201).json({
        message: "note updated perfectly fine",
        updatedNote
    });
});

// @desc Delete note with id
// @route DELETE api/notes/:id
// access Private
const deleteNote = asyncHandler(async(req,res) => {
    const deletedNote = await Note.findOneAndDelete({user: req.user._id, _id: req.params.id});
    if(!deletedNote){
        res.status(404);
        throw new Error("Not found or not authorized");
    }
    res.status(200).json({
        message: "Deleted note successfully",
        deletedNote
    });
});

module.exports = {createNote,getAllNotes,getNote,updateNote,deleteNote};