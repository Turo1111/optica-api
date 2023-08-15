const store = require('./store');
const mongoose = require('mongoose');


function addObraSocial(obraSocial) {
    if (!obraSocial) {
        return Promise.reject('Invalid user list');
    } 

    if (obraSocial.productosDescuento.length !== 0) {
        obraSocial.productosDescuento = obraSocial.productosDescuento.map(elem => new mongoose.Types.ObjectId(elem))
    }

    return store.add(obraSocial);
}

function getObraSocial() {
    return store.get();
}


function patchObraSocial(idObraSocial, obraSocial) {

    if (obraSocial.productosDescuento.length !== 0) {
        obraSocial.productosDescuento = obraSocial.productosDescuento.map(elem => new mongoose.Types.ObjectId(elem))
    }

    return store.patch(idObraSocial, obraSocial);
}


module.exports = {
    addObraSocial,
    getObraSocial,
    patchObraSocial
}