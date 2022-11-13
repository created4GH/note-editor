const bcrypt = require('bcrypt');
const setCookies = require('../config/setCookies');
const { users } = require('../config/db');

const login = async (req, res) => {
    console.log("login")
    const { username, password } = req.body;

    const unauthorizedRes = () => res.status(401).json('Please double-check username/password entered.');

    if (!username || !password) return res.status(400).json('Username and password are required.');

    const foundUser = users.find(item => item.username === username);
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
    console.log("logout")
    const token = req.cookies?.jwt;
    if (!token) return res.sendStatus(204);
    res.clearCookie('jwt', token, { httpOnly: true, expires: new Date(Date.now() + 30 * 60 * 1000) });
    return res.sendStatus(204);
}

module.exports = {
    login,
    logout
};