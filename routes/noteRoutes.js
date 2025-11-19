const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createNote, getAllNotes, getNote, updateNote, deleteNote } = require("../controllers/notesController");
const upload = require("../middleware/uploadMiddleware");
const router = express.Router();

router.route('/').post(protect,upload.single("file"),createNote).get(protect,getAllNotes);

router.route('/:id').get(protect,getNote).put(protect,updateNote).delete(protect,deleteNote);

module.exports = router;