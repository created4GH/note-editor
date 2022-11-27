const User = require('../models/user');
const bcrypt = require('bcrypt');
const setCookies = require('../config/setCookies');

const unauthorizedRes = () => res.status(401).json('Please double-check username/password entered.');

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json('Username and password are required.');
    }
    const foundUser = await User.findOne({ username }).lean();
    if (!foundUser) return unauthorizedRes();
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (isMatch) {
        const { username, password } = foundUser;
        setCookies(res, username, password);
        return res.status(200).json(foundUser);
    }
    else return unauthorizedRes();
}

const logout = async (req, res) => {
    const token = req.cookies?.jwt;
    if (!token) return res.sendStatus(204);
    res.clearCookie('jwt', token,
        {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            expires: new Date(Date.now() + 30 * 60 * 1000)
        });
    return res.sendStatus(204);
}

module.exports = {
    login,
    logout
};