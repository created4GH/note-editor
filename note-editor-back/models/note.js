const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Note = new Schema({
    id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        require: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        required: true
    },
    modifiedDate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('Note', Note);