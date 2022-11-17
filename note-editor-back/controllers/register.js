const User = require('../models/user');
const bcrypt = require('bcrypt');
const setCookies = require('../config/setCookies');

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json('Please double-check username/password entered.');
    }
    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) return res.status(409).json('Such a username already exists!');
    try {
        const user = await User.create({
            username,
            password: bcrypt.hashSync(password, 10),
            notes: []
        });
        setCookies(res, username, password);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = registerUser;