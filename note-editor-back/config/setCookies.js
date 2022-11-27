const jwt = require('jsonwebtoken');

const setCookies = (res, username, password) => {
    const token = jwt.sign(
        { username, password },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '30m' }
    );
    res.cookie('jwt', token,
        {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            expires: new Date(Date.now() + 30 * 60 * 1000)
        }
    );
};

module.exports = setCookies;


