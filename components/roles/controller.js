const store = require('./store');
const mongoose = require('mongoose');


function addRol(rol) {
    if (!rol) {
        return Promise.reject('Invalid user list');
    } 

    return store.add(rol);
}

function getRol() {
    return store.get();
}


function patchRol(idRol, rol) {
    return store.patch(idRol, rol);
}


module.exports = {
    addRol,
    getRol,
    patchRol
}