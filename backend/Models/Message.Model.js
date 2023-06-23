const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    username: {
        type: String,
    },
    content: {
        type: String,
    }
});

module.exports = mongoose.model('Message', MessageSchema);