const jwt = require('jsonwebtoken');
const { users } = require('../config/db');

const requestNotes = (username) => users.find(item => item.username === username)?.notes;
const getIndex = (username) => users.findIndex(item => item.username === username);

const getNotes = async (req, res) => {
    console.log('get');

    const token = req.cookies?.jwt;
    if (!token) return res.sendStatus(401).json('Unathorized attempt');

    const { username } = req.user;
    const notes = requestNotes(username);

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
        const index = getIndex(username);
        users[index].notes.push(note);
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
    const index = getIndex(username);
    const user = users[index];
    console.log('user', user);
    user.notes = user.notes.map(item => {
        return item.id === id ? { ...item, ...newInfo } : item;
    });
    console.log('notes', user.notes)
    res.sendStatus(201);
};

const deleteNote = async (req, res) => {
    console.log('delete');
    const { id } = req.body;
    const { username } = req.user;
    if (!id) return res.sendStatus(400).json('Id is required!');
    const index = getIndex(username);
    users[index].notes = users[index].notes.filter(item => item.id !== id);
    res.json({ message: 'Note deleted' });
}

module.exports = {
    getNotes,
    addNote,
    patchNote,
    deleteNote
}