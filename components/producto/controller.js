const store = require('./store');
const mongoose = require('mongoose');


function addProducto(producto) {
    if (!producto) {
        return Promise.reject('Invalid user list');
    } 

    return store.add({
        ...producto,
        idCategoria: new mongoose.Types.ObjectId(producto.idCategoria)
    });
}

function getProducto() {
    return store.get();
}


function patchProducto(idProducto, producto) {
    return store.patch(idProducto, producto);
}


module.exports = {
    addProducto,
    getProducto,
    patchProducto
}