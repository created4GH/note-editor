const setCookies = require('../config/setCookies');

const handleRefreshToken = (req, res) => {
        const {username, password} = req.user;
        setCookies(res, username, password);
        return res.sendStatus(200);
}

module.exports = handleRefreshToken;