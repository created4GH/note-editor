const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    // console.log('username', username, 'password', password);
    const unauthorizedRes = () => res.status(401).json(
        { message: 'Please double-check username/password entered.' });

    if (!username || !password) return res.status(400).json(
        { message: 'Username and password are required.' });

    const foundUser = await User.findOne({ username }).lean();
    if (!foundUser) return unauthorizedRes();

    const isMatch = await bcrypt.compare(password, foundUser.password);

    if (isMatch) {
        const token = jwt.sign(foundUser, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 1000 });
        res.json({ message: 'You have been logged in!' });
    }
    else return unauthorizedRes();
}

const logout = async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token) return res.sendStatus(204);
    console.log("here")
    res.clearCookie('jwt', token, { httpOnly: true, maxAge: 30 * 60 * 1000 });
    res.json('Cookies cleared');
}

module.exports = {
    login,
    logout
};