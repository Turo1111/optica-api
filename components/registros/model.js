const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
    },
    coleccion: {
        type: String,
        required: true,
    },
    idColeccion: {
        type: Schema.ObjectId,
		required: true,
    },
    accion: {
        type: String,
		required: true,
    },
    fechaHora: {
        type: Date,
		required: true,
    }
});

const model = mongoose.model('Registro', mySchema);
module.exports = model;
