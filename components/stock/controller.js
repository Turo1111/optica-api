const store = require('./store');
const mongoose = require('mongoose');


function addStock(stock) {
    if (!stock) {
        return Promise.reject('Invalid user list');
    } 

    return store.add({
        ...stock,
        idSucursal: new mongoose.Types.ObjectId(stock.idSucursal),
        idProducto: new mongoose.Types.ObjectId(stock.idProducto)
    });
}

function findExist(idSucursal, idProducto) {
    if (!idSucursal && !idProducto) {
        return Promise.reject('Invalid user list');
    } 

    return store.find(idSucursal, idProducto);
}

function getStock(idProducto) {
    return store.get(new mongoose.Types.ObjectId(idProducto));
}


function patchStock(idStock, stock) {
    return store.patch(idStock, stock);
}


module.exports = {
    addStock,
    getStock,
    patchStock,
    findExist
}