const jwt = require('jsonwebtoken');
const Note = require('../models/note');
const User = require('../models/user');

const getNotes = async (req, res) => {
    console.log('get');
    const token = req.cookies?.jwt;
    if (!token) return res.sendStatus(401).json('Unathorized attempt');

    const { username } = req.user;
    const user = await User.findOne({ username }).lean();
    const notes = user?.notes;

    res.status(200).json(notes);
};

const addNote = async (req, res) => {
    console.log('add');
    try {
        const { username } = req.user;
        const note = {
            ...req.body,
            username,
            createdDate: new Date().getTime(),
            modifiedDate: new Date().getTime()
        }

        const user = await User.findOne({ username });
        user.notes.unshift(note);
        await user.save();
        return res.status(201).json(note);
    } catch (error) {
        return res.status(400).json(error.message);
    }
};

const patchNote = async (req, res) => {
    console.log('update');
    const { id } = req.body;
    const newInfo = { ...req.body, modifiedDate: new Date().getTime() };
    if (!id) return res.sendStatus(400).json('Id is required!');
    const { username } = req.user;
    const user = await User.findOne({ username });
    user.notes = user.notes.map(item => item.id !== id ? item : { ...item, ...newInfo });
    await user.save();
    res.sendStatus(201);
};

const deleteNote = async (req, res) => {
    console.log('delete');
    const { id } = req.body;
    const { username } = req.user;
    if (!id) return res.sendStatus(400).json('Id is required!');
    const user = await User.findOne({ username });
    user.notes = user.notes.filter(note => note.id !== id);
    await user.save();
    res.json({ message: 'Note deleted' });
}

module.exports = {
    getNotes,
    addNote,
    patchNote,
    deleteNote
}