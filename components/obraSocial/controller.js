const store = require('./store');
const mongoose = require('mongoose');


function addObraSocial(obraSocial) {
    if (!obraSocial) {
        return Promise.reject('Invalid user list');
    } 

    return store.add(obraSocial);
}

function getObraSocial() {
    return store.get();
}


function patchObraSocial(idObraSocial, obraSocial) {
    return store.patch(idObraSocial, obraSocial);
}


module.exports = {
    addObraSocial,
    getObraSocial,
    patchObraSocial
}