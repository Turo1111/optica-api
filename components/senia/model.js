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
    armazon: {
        type: Number,
        required: true,
    },
    lente: {
        type: Number,
        required: true,
    },
    observacion: {
        type: String,
    },
    saldo: {
        type: Number,
        required: true,
    },
    idCliente: {
        type: Schema.ObjectId,
        ref: 'Cliente'
    },
    estado: {
        type: Boolean,
        required: true
    }
});

const model = mongoose.model('Senia', mySchema);
module.exports = model;