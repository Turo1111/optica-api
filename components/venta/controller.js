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

async function getTotalVenta(query) {
    try {
        
        const ventas = await store.getTotalVenta({...query, 
            sucursales: query.sucursales.map(item => new mongoose.Types.ObjectId(item)),
            obraSociales: query.obraSociales.map(item => new mongoose.Types.ObjectId(item))
        })
        const lastVentas = await store.getTotalLastVenta({...query, 
            sucursales: query.sucursales.map(item => new mongoose.Types.ObjectId(item)),
            obraSociales: query.obraSociales.map(item => new mongoose.Types.ObjectId(item))
        })
        const total = ventas.reduce((total, sale) => {
          return total + (sale.total || 0);
        }, 0);
        const totalLast = lastVentas.reduce((total, sale) => {
            return total + (sale.total || 0);
        }, 0);
        const tipoPago = ventas.reduce((acumulador, venta) => {
            const { total, tipoPago } = venta;
            const descripcion = tipoPago.descripcion;
          
            if (!acumulador[descripcion]) {
              acumulador[descripcion] = { label: descripcion, cantidad: 0, value: 0 };
            }
          
            acumulador[descripcion].cantidad++;
            acumulador[descripcion].value += total;
          
            return acumulador;
        }, {});
        const porTipoPago = Object.values(tipoPago);
        const sucursal = ventas.reduce((acumulador, venta) => {
            const { total, sucursal } = venta;
            const descripcion = sucursal.descripcion;
          
            if (!acumulador[descripcion]) {
              acumulador[descripcion] = { label: descripcion, cantidad: 0, value: 0 };
            }
          
            acumulador[descripcion].cantidad++;
            acumulador[descripcion].value += total;
          
            return acumulador;
        }, {});
        const porSucursal = Object.values(sucursal);
        const crecimiento = (((parseFloat(total)-parseFloat(totalLast))/parseFloat(totalLast))*100).toFixed(2)

        return { total: (parseFloat(total)).toFixed(2), cantidad: ventas.length, ventas:  ventas, tipoPago: porTipoPago, sucursal: porSucursal, crecimiento: crecimiento}

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
    getSaleToday,
    getTotalVenta
}