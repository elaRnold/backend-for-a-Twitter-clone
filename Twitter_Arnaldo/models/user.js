const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    age: {
        required: true,
        min: 18, 
        max: 100,
        type: Number
    },
    nombre: {
        require: true,
        type: String
    },
    apellido: {
        require: true,
        type: String
    },
    gender: {
        require: true,
        type: String
    },
    nacionalidad: {
        require: true,
        type: String
    },

})

module.exports = mongoose.model('UserData', userSchema)