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
    fechaInicio: {
        type: Date,
        required: true,
    },
    fechaFinal: {
        type: Date,
        required: true,
    },
    sucursales: {
        type: Array,
    },
    idProducto: {
        type: Schema.ObjectId,
        ref: 'Producto',
    }
});

const model = mongoose.model('Oferta', mySchema);
module.exports = model;