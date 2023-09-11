const store = require('./store');
const mongoose = require('mongoose');


function addLineaVenta(lineaVenta) {
    if (!lineaVenta) {
        return Promise.reject('Invalid user list');
    } 

    if (lineaVenta.idLente) {
        if ( isObjectId(lineaVenta.idLente)) {
            lineaVenta.idLente = new mongoose.Types.ObjectId(lineaVenta.idLente);
        }
    }

    return store.add({
        ...lineaVenta,
        idProducto: new mongoose.Types.ObjectId(lineaVenta.idProducto),
        idVenta: new mongoose.Types.ObjectId(lineaVenta.idVenta),
    });
}

function getLineaVenta(idVenta) {
    return store.get(new mongoose.Types.ObjectId(idVenta));
}


function patchLineaVenta(idLineaVenta, lineaVenta) {
    return store.patch(idLineaVenta, lineaVenta);
}


module.exports = {
    addLineaVenta,
    getLineaVenta,
    patchLineaVenta
}