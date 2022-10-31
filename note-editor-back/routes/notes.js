const express = require('express');
const router = express.Router();
const { getNotes, addNote, updateNote, deleteNote } = require('../controllers/notes');

router.route('/')
    .get(getNotes)
    .post(addNote)
    .patch(updateNote)
    .delete(deleteNote);

module.exports = router;