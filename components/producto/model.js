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
    imagen : {
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
    precioGeneral: {
        type: Number,
        required: true,
    },
    precioCompra: {
        type: Number,
    },
    idCategoria : {
        type: Schema.ObjectId,
        ref: 'Categoria',
        required: true,
    },
    idProveedor : {
        type: Schema.ObjectId,
        ref: 'Proveedor',
        required: true,
    },
    idMarca : {
        type: Schema.ObjectId,
        ref: 'Marca',
    },
    idColor : {
        type: Schema.ObjectId,
        ref: 'Color',
    }
});

const model = mongoose.model('Producto', mySchema);
module.exports = model;