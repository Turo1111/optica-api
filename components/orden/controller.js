const store = require('./store');
const mongoose = require('mongoose');


function addOrden(orden) {
    if (!orden) {
        return Promise.reject('Invalid user list');
    } 

    return store.add({
        ...orden,
        idObraSocial: new mongoose.Types.ObjectId(orden.idObraSocial)
    });
}

function getOrden() {
    return store.get();
}


function patchOrden(idOrden, orden) {
    return store.patch(idOrden, orden);
}


module.exports = {
    addOrden,
    getOrden,
    patchOrden
}