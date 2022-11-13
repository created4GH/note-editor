const bcrypt = require('bcrypt');
const setCookies = require('../config/setCookies');
const { users } = require('../config/db');

const registerUser = async (req, res) => {
    console.log('register');

    const { username, password } = req.body;
    if (!username || !password) return res.status(401).json('Please double-check username/password entered.');

    const duplicate = users.find(item => item.username === username);
    if (duplicate) return res.status(409).json('Such a username already exists!');

    try {
        const user = { username, password: bcrypt.hashSync(password, 10), notes: [] };
        users.push(user)
        console.log('user registered', user)
        setCookies(res, username, password);
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = registerUser;