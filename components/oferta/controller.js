const store = require('./store');
const mongoose = require('mongoose');
const moment = require('moment-timezone');


function addOferta(oferta) {
    if (!oferta) {
        return Promise.reject('Invalid user list');
    } 

    if (oferta.sucursales.length !== 0) {
        oferta.sucursales = oferta.sucursales.map(elem => new mongoose.Types.ObjectId(elem))
    }


    return store.add({...oferta, idProducto: new mongoose.Types.ObjectId(oferta.idProducto) });
}

function findExist(idProducto, fechaInicio, fechaFinal) {
    if (!idProducto) {
        return Promise.reject('Invalid user list');
    } 

    return store.find(idProducto, fechaInicio, fechaFinal);
}

function getOferta(idProducto) {
    return store.get(new mongoose.Types.ObjectId(idProducto));
}


function patchOferta(idOferta, oferta) {

    if (oferta.sucursales.length !== 0) {
        oferta.sucursales = oferta.sucursales.map(elem => new mongoose.Types.ObjectId(elem))
    }

    return store.patch(idOferta, oferta);
}


module.exports = {
    addOferta,
    getOferta,
    patchOferta,
    findExist
}