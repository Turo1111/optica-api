const store = require('./store');
const mongoose = require('mongoose');


function addOferta(oferta) {
    if (!oferta) {
        return Promise.reject('Invalid user list');
    } 

    return store.add({...oferta, idProducto: new mongoose.Types.ObjectId(oferta.idProducto) });
}

function findExist(idProducto) {
    if (!idProducto) {
        return Promise.reject('Invalid user list');
    } 

    return store.find(idProducto);
}

function getOferta() {
    return store.get();
}


function patchOferta(idOferta, oferta) {
    return store.patch(idOferta, oferta);
}


module.exports = {
    addOferta,
    getOferta,
    patchOferta,
    findExist
}