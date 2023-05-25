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
    precio: {
        type: Number,
        required: true,
    },
    idProducto : {
        type: Schema.ObjectId,
        ref: 'Producto',
        required: true,
    },
    idCompra : {
        type: Schema.ObjectId,
        ref: 'Compra',
        required: true,
    }
});

const model = mongoose.model('LineaCompra', mySchema);
module.exports = model;