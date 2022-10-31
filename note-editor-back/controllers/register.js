const User = require('../models/user');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(401).json({message: 'Please double-check username/password entered.'});;

    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) return res.status(409).json({ message: 'Such a username already exists!' });

    try {
        await User.create({
            username,
            password: bcrypt.hashSync(password, 10)
        });

        return res.status(201).json({ message: `User ${username} created` });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = registerUser;