const express = require('express');
const router = express.Router();
const { getNotes, addNote, patchNote, deleteNote } = require('../../controllers/notes');

router.route('/')
    .get(getNotes)
    .post(addNote)
    .patch(patchNote)
    .delete(deleteNote);

module.exports = router;