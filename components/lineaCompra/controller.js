const store = require('./store');
const mongoose = require('mongoose');


function addLineaCompra(lineaCompra) {
    if (!lineaCompra) {
        return Promise.reject('Invalid user list');
    } 

    return store.add({
        ...lineaCompra,
        idProducto: new mongoose.Types.ObjectId(lineaCompra.idProducto),
        idCompra: new mongoose.Types.ObjectId(lineaCompra.idCompra),
    });
}

function getLineaCompra(idCompra) {
    return store.get(new mongoose.Types.ObjectId(idCompra));
}


function patchLineaCompra(idLineaCompra, lineaCompra) {
    return store.patch(idLineaCompra, lineaCompra);
}


module.exports = {
    addLineaCompra,
    getLineaCompra,
    patchLineaCompra
}