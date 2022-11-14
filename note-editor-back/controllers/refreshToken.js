const handleRefreshToken = (req, res) => {
        const {username, password} = req.user;
        setCookies(res, username, password);
}

module.exports = handleRefreshToken;