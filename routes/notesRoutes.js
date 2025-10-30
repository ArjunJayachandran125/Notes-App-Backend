const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createNote, getUserNotes, getNoteWithId, updateNoteWithId, deleteNoteWithId } = require("../controllers/notesController");
const router = express.Router();

router.route('/').post(protect,createNote).get(protect,getUserNotes);
router.route('/:id').get(protect,getNoteWithId).put(protect,updateNoteWithId).delete(protect,deleteNoteWithId);

module.exports = router;