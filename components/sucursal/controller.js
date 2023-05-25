const store = require('./store');
const mongoose = require('mongoose');


function addSucursal(sucursal) {
    if (!sucursal) {
        return Promise.reject('Invalid user list');
    } 

    return store.add(sucursal);
}

function getSucursal() {
    return store.get();
}


function patchSucursal(idSucursal, sucursal) {
    return store.patch(idSucursal, sucursal);
}


module.exports = {
    addSucursal,
    getSucursal,
    patchSucursal
}