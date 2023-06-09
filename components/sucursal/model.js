const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
    },
    descripcion: {
        type: String,
        required: true,
    },
    direccion: {
        type: String,
    },
    telefono: {
        type: String,
    },
    estado: {
        type: Boolean,
    }
});

const model = mongoose.model('Sucursal', mySchema);
module.exports = model;