const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    cuerpo: {
        required: true,
        type: String
    },
    autor: {
        type: 'ObjectId', ref: 'UserData',
    },
    fecha: {
        required: true,
        type: Date, 
        default: Date.now,
    }

})

module.exports = mongoose.model('tweetData', tweetSchema)