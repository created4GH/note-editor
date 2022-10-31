const jwt = require('jsonwebtoken');
const Note = require('../models/note');

const getNotes = async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token) return res.sendStatus(401).json('Unathorized attempt');

    const {username} = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const notes = await Note.find({ id: 'string' }).lean();
    res.json(notes);
};

const addNote = async (req, res) => {
    try {
        await Note.create(req.body);
        res.json('New note created');
    } catch (error) {
        res.status(400).json(error.message);
    }
};

const updateNote = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.sendStatus(400).json('Id is required!');
    await Note.findOneAndUpdate({ id }, req.body).lean();
    res.json('updated');
};

const deleteNote = async (req, res) => {
    const { id } = req.body;
    if (!id) return res.sendStatus(400).json('Id is required!');
    await Note.deleteOne({ id }).lean();
    res.json('deleted')
}

module.exports = {
    getNotes,
    addNote,
    updateNote,
    deleteNote
}