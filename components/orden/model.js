const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
    },
    fecha: {
        type: Date,
        required: true,
    },
    numero: {
        type: String,
        required: true,
    },
    idObraSocial : {
        type: Schema.ObjectId,
        ref: 'ObraSocial',
        required: true,
    }
});

const model = mongoose.model('Orden', mySchema);
module.exports = model;