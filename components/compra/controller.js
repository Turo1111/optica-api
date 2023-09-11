const store = require('./store');
const mongoose = require('mongoose');
const moment = require('moment-timezone');

function addCompra(compra) {
    if (!compra) {
        return Promise.reject('Invalid user list');
    } 

    return store.add(compra);
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