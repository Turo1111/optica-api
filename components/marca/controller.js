const store = require('./store');
const mongoose = require('mongoose');


function addMarca(marca) {
    if (!marca) {
        return Promise.reject('Invalid user list');
    } 

    return store.add(marca);
}

function findExist(descripcion) {
    if (!descripcion) {
        return Promise.reject('Invalid user list');
    } 

    return store.find(descripcion);
}

function getMarca() {
    return store.get();
}


function patchMarca(idMarca, marca) {
    return store.patch(idMarca, marca);
}


module.exports = {
    addMarca,
    getMarca,
    patchMarca,
    findExist
}