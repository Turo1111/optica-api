const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
    },
    nombreCompleto: {
        type: String,
        required: true,
    },
    telefono: {
        type: String,
    },
    direccion: {
        type: String,
    },
    idSucursal: {
        type: Schema.ObjectId,
        ref: 'Sucursal',
    },
    idRol: {
        type: Schema.ObjectId,
        ref: 'Rol',
    },
    estado: {
        type: Boolean,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const model = mongoose.model('Empleado', mySchema);
module.exports = model;