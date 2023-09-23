const store = require('./store');
const mongoose = require('mongoose');
const moment = require('moment-timezone');


function addCierreCaja(cierreCaja) {
    if (!cierreCaja) {
        return Promise.reject('Invalid cierre caja');
    } 

    return store.add({...cierreCaja, idEmpleado : new mongoose.Types.ObjectId(cierreCaja.idEmpleado), idSucursal : new mongoose.Types.ObjectId(cierreCaja.idSucursal)});
}

function findExist(idSucursal, fecha) {
    if (!idSucursal) {
        return Promise.reject('Invalid idSucursal');
    } 

    return store.find(new mongoose.Types.ObjectId(idSucursal), fecha);
}

function getCierreCaja() {
    return store.get();
}

function getLastDate(idSucursal) {

    if (!idSucursal) {
        return Promise.reject('Invalid IDSUCURSAL');
    } 

    return store.getLastDate(new mongoose.Types.ObjectId(idSucursal));
}

async function getTotalCC(query) {
    try {
        
        const cc = await store.getTotalCC({...query, 
            sucursales: query.sucursales.map(item => new mongoose.Types.ObjectId(item))
        })
        const total = cc.reduce((total, sale) => {
            return total + (sale.total || 0);
        }, 0);

        return { total: (parseFloat(total)).toFixed(2) }

    } catch (error) {
        return Promise.reject('Error al buscar ventas '+` ${error}`);
    }
}

module.exports = {
    addCierreCaja,
    getCierreCaja,
    findExist,
    getLastDate,
    getTotalCC
}