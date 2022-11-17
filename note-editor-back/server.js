const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/eventLogger');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/connectDb');
const verifyJWT = require('./middleware/verifyJWT');
const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

app.use(verifyJWT);

app.use('/notes', require('./routes/api/notes'));
app.use('/auth/refresh', require('./routes/refresh'));

app.use(errorHandler);

mongoose.connection.once('open', async () => {
    app.listen(PORT, () => console.log('server is running!'));
});
