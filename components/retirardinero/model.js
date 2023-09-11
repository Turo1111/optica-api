const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
    },
    fecha: {
        type: Date,
        required: true
    },
    idEmpleado : {
        type: Schema.ObjectId,
        ref: 'Empleado',
        required: true,
    },
    idSucursal : {
        type: Schema.ObjectId,
        ref: 'Sucursal',
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
});

const model = mongoose.model('RetiroDinero', mySchema);
module.exports = model;