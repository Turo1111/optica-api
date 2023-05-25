const store = require('./store');
const mongoose = require('mongoose');


function addCategoria(categoria) {
    if (!categoria) {
        return Promise.reject('Invalid user list');
    } 

    return store.add(categoria);
}

function getCategoria() {
    return store.get();
}


function patchCategoria(idCategoria, descripcion) {
    return store.patch(idCategoria, descripcion);
}


module.exports = {
    addCategoria,
    patchCategoria,
    getCategoria
}