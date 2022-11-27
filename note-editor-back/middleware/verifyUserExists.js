const User = require('../models/user');

const verifyUserExists = async (req, res, next) => {
    try {
        const { username } = req.user;
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json('No such a user');
        req.user = user;
        next();
    }
    catch (error) {
        throw new Error(error);
    }
}

module.exports = verifyUserExists;