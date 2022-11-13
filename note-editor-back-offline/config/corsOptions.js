const allowedOrigins = require('./allowedOrigins');

const corsOptions = {
    origin: (origin, callback) => {
        console.log('origin', origin, allowedOrigins.indexOf(origin) !== -1);
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) callback(null, true);
        else callback(new Error('Not Allowed by CORS'));
    },
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;