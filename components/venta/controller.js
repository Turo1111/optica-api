const store = require('./store');
const mongoose = require('mongoose');
const moment = require('moment-timezone');


function addVenta(venta) {
    if (!venta) {
        return Promise.reject('Invalid user list');
    } 

    return store.add({
        ...venta,
        idEmpleado: new mongoose.Types.ObjectId(venta.idEmpleado),
        idSucursal: new mongoose.Types.ObjectId(venta.idSucursal),
        idCliente: venta.idCliente ? new mongoose.Types.ObjectId(venta.idCliente) : null,
        idOrden: venta.idOrden ? new mongoose.Types.ObjectId(venta.idOrden): null,
    });
}

function getVenta() {
    return store.get();
}

async function getSaleToday(idSucursal) {
    try {
        const lastClosure = await store.getLastCC(new mongoose.Types.ObjectId(idSucursal))

      const ventasDineroIngresado = await store.getDineroIngresado(new mongoose.Types.ObjectId(idSucursal), lastClosure?.fecha)
      const totalDineroIngresado = ventasDineroIngresado.reduce((total, sale) => {
        return total + (sale.dineroIngresado || 0);
      }, 0);
      const ventasPago = await store.getPago(new mongoose.Types.ObjectId(idSucursal), lastClosure?.fecha)
      const totalPago = ventasPago.reduce((total, sale) => {
        return total + (sale.pago ? sale.pago.total : 0);
      }, 0);
      const retiro = await store.getLastRetiro(new mongoose.Types.ObjectId(idSucursal), lastClosure?.fecha)
      const totalRetiro = retiro.reduce((total, sale) => {
        return total + (sale.total || 0);
      }, 0);
      return { total: (parseFloat(totalDineroIngresado)+parseFloat(totalPago)-parseFloat(totalRetiro)).toFixed(2) }

    } catch (error) {
        return Promise.reject('Error al buscar ventas '+` ${error}`);
    }
}


function patchVenta(idVenta, venta) {
    return store.patch(idVenta, venta);
}


module.exports = {
    addVenta,
    getVenta,
    patchVenta,
    getSaleToday
}