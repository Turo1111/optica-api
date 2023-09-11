const store = require('./store');
const mongoose = require('mongoose');
const moment = require('moment-timezone');


function addRetiroDinero(retirodinero) {
    if (!retirodinero) {
        return Promise.reject('Invalid cierre caja');
    } 

    return store.add({...retirodinero, idEmpleado : new mongoose.Types.ObjectId(retirodinero.idEmpleado), idSucursal : new mongoose.Types.ObjectId(retirodinero.idSucursal)});
}

function findExist(idSucursal, fecha) {
    if (!idSucursal) {
        return Promise.reject('Invalid idSucursal');
    } 

    return store.find(new mongoose.Types.ObjectId(idSucursal), fecha);
}

function getRetiroDinero() {
    return store.get();
}


module.exports = {
    addRetiroDinero,
    getRetiroDinero,
    findExist
}