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
    codigo: {
        type: String,
    },
    numeracion: {
        type: String,
    },
    alto: {
        type: String,
    },
    ancho: {
        type: String,
    },
    idCategoria : {
        type: Schema.ObjectId,
        ref: 'Categoria',
    },
    idMarca : {
        type: Schema.ObjectId,
        ref: 'Categoria',
    },
    idColor : {
        type: Schema.ObjectId,
        ref: 'Categoria',
    }
});

const model = mongoose.model('Producto', mySchema);
module.exports = model;