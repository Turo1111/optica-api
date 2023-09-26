const store = require('./store');
const mongoose = require('mongoose');
const moment = require('moment-timezone');

function addCompra(compra) {
    if (!compra) {
        return Promise.reject('Invalid user list');
    } 

    return store.add({...compra, idSucursal: new mongoose.Types.ObjectId(compra.idSucursal), idProveedor: new mongoose.Types.ObjectId(compra.idProveedor)});
}

function getCompra() {
    return store.get();
}


function patchCompra(idCompra, compra) {
    return store.patch(idCompra, compra);
}


module.exports = {
    addCompra,
    getCompra,
    patchCompra
}