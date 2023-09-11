const store = require('./store');
const mongoose = require('mongoose');


function addProveedor(proveedor) {
    if (!proveedor) {
        return Promise.reject('Invalid user list');
    } 

    return store.add(proveedor);
}

function findExist(descripcion) {
    if (!descripcion) {
        return Promise.reject('Invalid user list');
    } 

    return store.find(descripcion);
}

function getProveedor() {
    return store.get();
}


function patchProveedor(idProveedor, proveedor) {
    return store.patch(idProveedor, proveedor);
}


module.exports = {
    addProveedor,
    getProveedor,
    patchProveedor,
    findExist
}