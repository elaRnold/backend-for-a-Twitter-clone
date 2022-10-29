const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const seguidorSchema = new Schema({
    
    seguidor: {
        type: 'ObjectId', ref: 'UserData',
    },
    seguido: {
        type: 'ObjectId', ref: 'UserData',
    },
    fecha: {
        required: true,
        type: Date, 
        default: Date.now,
    }

})

module.exports = mongoose.model('seguidorData', seguidorSchema)