const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
    },
    descuento: {
        type: Number,
        required: true,
    },
    desde: {
        type: Date,
        required: true,
    },
    hasta: {
        type: Date,
        required: true,
    },
    estado: {
        type: Boolean,
        required: true
    },
    idProducto: {
        type: Schema.ObjectId,
        ref: 'Producto',
    }
});

const model = mongoose.model('Oferta', mySchema);
module.exports = model;