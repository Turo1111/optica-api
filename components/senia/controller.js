const store = require('./store');
const mongoose = require('mongoose');


function addSenia(senia) {
    if (!senia) {
        return Promise.reject('Invalid user list');
    } 

    return store.add({...senia, idCliente: new mongoose.Types.ObjectId(senia.idCliente)});
}

function findExist(idCliente) {
    if (!idCliente) {
        return Promise.reject('Invalid user list');
    } 

    return store.find(idCliente);
}

function getSenia() {
    return store.get();
}


function patchSenia(idSenia, senia) {
    return store.patch(idSenia, senia);
}


module.exports = {
    addSenia,
    getSenia,
    patchSenia,
    findExist
}