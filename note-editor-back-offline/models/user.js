const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    notes: {
        type:
            [{
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
            }],
        required: true
    }
});

module.exports = mongoose.model('User', User);
