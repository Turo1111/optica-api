const producto = require('../components/producto/network');
const categoria = require('../components/categoria/network');
const sucursal = require('../components/sucursal/network');
const stock = require('../components/stock/network');
const oferta = require('../components/oferta/network');
const empleado = require('../components/empleado/network');
const obraSocial = require('../components/obraSocial/network');
const cliente = require('../components/cliente/network');
const senia = require('../components/senia/network');
const venta = require('../components/venta/network');
const lineaventa = require('../components/lineaVenta/network');
const orden = require('../components/orden/network');
const compra = require('../components/compra/network');
const lineacompra = require('../components/lineaCompra/network');
const color = require('../components/color/network');
const marca = require('../components/marca/network');
const roles = require('../components/roles/network');
const reg = require('../components/registros/network');

const routes = function (server) {
    server.use('/producto', producto);
    server.use('/categoria', categoria);
    server.use('/sucursal', sucursal);
    server.use('/stock', stock);
    server.use('/oferta', oferta);
    server.use('/empleado', empleado);
    server.use('/obrasocial', obraSocial);
    server.use('/cliente', cliente);
    server.use('/senia', senia);
    server.use('/venta', venta);
    server.use('/lineaventa', lineaventa);  
    server.use('/orden', orden);
    server.use('/compra', compra);
    server.use('/lineacompra', lineacompra);
    server.use('/color', color);
    server.use('/marca', marca);
    server.use('/roles', roles);
    server.use('/reg', reg);
}

module.exports = routes;