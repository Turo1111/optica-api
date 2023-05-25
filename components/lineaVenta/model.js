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
    total: {
        type: Number,
        required: true,
    },
    idProducto : {
        type: Schema.ObjectId,
        ref: 'Producto',
        required: true,
    },
    idVenta : {
        type: Schema.ObjectId,
        ref: 'Venta',
        required: true,
    }
});

const model = mongoose.model('LineaVenta', mySchema);
module.exports = model;