const store = require('./store');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function addCliente(cliente) {
    if (!cliente) {
        return Promise.reject('Invalid user list');
    } 

    return store.add(cliente);
}

function findExist(dni) {
    if (!dni) {
        return Promise.reject('Invalid user list');
    } 

    return store.find(dni);
}

function getCliente() {
    return store.get();
}

function patchCliente(idCliente, cliente) {
    return store.patch(idCliente, cliente);
}


module.exports = {
    addCliente,
    getCliente,
    patchCliente,
    findExist
}