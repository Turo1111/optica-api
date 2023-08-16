const store = require('./store');
const mongoose = require('mongoose');


function addSenia(senia) {
    if (!senia) {
        return Promise.reject('[add] Invalid user list');
    } 

    return store.add({...senia, idCliente: new mongoose.Types.ObjectId(senia.idCliente)});
}

function findExist(idCliente) {
    if (!idCliente) {
        return Promise.reject('[find] Invalid user list');
    } 

    return store.find(idCliente);
}

function getSenia(idCliente) {
    return store.get(new mongoose.Types.ObjectId(idCliente));
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