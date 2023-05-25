const store = require('./store');
const mongoose = require('mongoose');


function addVenta(venta) {
    if (!venta) {
        return Promise.reject('Invalid user list');
    } 

    return store.add({
        ...venta,
        idEmpleado: new mongoose.Types.ObjectId(venta.idEmpleado),
        idSucursal: new mongoose.Types.ObjectId(venta.idSucursal),
        idCliente: venta.idCliente ? new mongoose.Types.ObjectId(venta.idCliente) : null,
        idOrden: venta.idOrden ? new mongoose.Types.ObjectId(venta.idOrden): null
    });
}

function getVenta() {
    return store.get();
}


function patchVenta(idVenta, venta) {
    return store.patch(idVenta, venta);
}


module.exports = {
    addVenta,
    getVenta,
    patchVenta
}