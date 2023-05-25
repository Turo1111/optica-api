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
    tipoDescuento: {
        type: Boolean,
        required: true,
    },
    cantidadDescuento: {
        type: Number,
        required: true,
    },
    cantidadDevuelta: {
        type: Number,
        required: true,
    },
    productosDescuento : {
        type: Array,
    }
});

const model = mongoose.model('ObraSocial', mySchema);
module.exports = model;