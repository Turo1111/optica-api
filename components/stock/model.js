const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
    },
    cantidad: {
        type: Number,
        required: true,
    },
    precioEfectivo: {
        type: Number,
        required: true,
    },
    precioLista: {
        type: Number,
        required: true,
    },
    idProducto: {
        type: Schema.ObjectId,
        ref: 'Producto',
        required: true,
    },
    idSucursal: {
        type: Schema.ObjectId,
        ref: 'Sucursal',
        required: true,
    },
});

const model = mongoose.model('Stock', mySchema);
module.exports = model;