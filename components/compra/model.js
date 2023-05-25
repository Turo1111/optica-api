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
    total: {
        type: Number,
        required: true,
    },
    observacion: {
        type: String,
    },
    proveedor: {
        type: String,
    }
});

const model = mongoose.model('Compra', mySchema);
module.exports = model;