const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const likeSchema = new Schema({
    
    tweetliked: {
        type: 'ObjectId', ref: 'tweetData',
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

module.exports = mongoose.model('likedData', likeSchema)