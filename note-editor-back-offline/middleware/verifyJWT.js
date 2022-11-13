const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.cookies?.jwt;
    // console.log('req.cookies', req.cookies);
    try {
        const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie('jwt', process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        res.status(401);
    }
};

module.exports = verifyJWT;