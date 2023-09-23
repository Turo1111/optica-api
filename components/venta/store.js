const Model = require('./model');
const CierreCajaModel = require('../cierrecaja/model');
const RetiroDinero = require('../retirardinero/model');

function addVenta(venta) {
    const vent = new Model(venta);
    return vent.save();
}

function getVenta() {
    return Model.aggregate(
		[
			{
                $lookup: {
                 from: "clientes",
                 localField:  "idCliente" ,
                 foreignField: "_id",
                 as: "cliente"
                }
            },
			{
                $lookup: {
                 from: "empleados",
                 localField:  "idEmpleado" ,
                 foreignField: "_id",
                 as: "empleado"
                }
            },
            {
                $lookup: {
                 from: "ordens",
                 localField:  "idOrden" ,
                 foreignField: "_id",
                 as: "orden"
                }
            },
            {
                $lookup: {
                 from: "sucursals",
                 localField:  "idSucursal" ,
                 foreignField: "_id",
                 as: "sucursal"
                }
            },
            {
                $lookup: {
                 from: "lineaventas",
                 localField:  "_id" ,
                 foreignField: "idVenta",
                 as: "cantidadProductos"
                }
            },
            {
                $unwind: {
                    path: "$cliente",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$empleado",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$sucursal",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$orden",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $lookup: {
                    from: "obrasocials",
                    localField: "orden.idObraSocial",
                    foreignField: "_id",
                    as: "obraSocial"
                }
            },
            {
                $unwind: {
                    path: "$obraSocial",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    fecha: 1,
                    observacion: 1,
                    tipoPago: 1,
                    total: 1,
                    cliente: "$cliente.nombreCompleto",
                    empleado: "$empleado.nombreCompleto",
                    sucursal: "$sucursal.descripcion",
                    descuento: 1,
                    subTotal: 1,
                    dineroIngresado: { $ifNull: ["$dineroIngresado", null] },
                    orden: { $ifNull: ["$orden", null] },
                    cantidadProductos: { $size: '$cantidadProductos' },
                    obraSocialDescripcion: "$obraSocial.descripcion",
                    pago: 1
                }
            }  /* */
		]
	).sort({ fecha: -1 })
}

function getLastCC(idSucursal) {
  return CierreCajaModel
      .findOne({ idSucursal })
      .sort({ fecha: -1 }) // Ordena en orden descendente para obtener el último cierre
      .exec();
}

function getLastRetiro(idSucursal, fecha) {

  const query = {
    idSucursal
  };

  if (fecha !== undefined) {
    query.fecha = { $gte: fecha };
  }

  return RetiroDinero
      .find(query)
      .sort({ fecha: -1 }) // Ordena en orden descendente para obtener el último cierre
      .exec();
}
  
function getDineroIngresado(idSucursal, fecha) {

  const query = {
    idSucursal,
    $or: [
      { "tipoPago.descripcion": "EFECTIVO" },
      { "tipoPago.descripcion": "EFECTIVO Y TARJETA" },
      { "tipoPago.descripcion": "CUENTA CORRIENTE" }
    ]
  };

  // Agregar el filtro de fecha si fecha no es undefined
  if (fecha !== undefined) {
    query.fecha = { $gte: fecha };
  }

  // Ejecutar la consulta
  return Model.find(query).exec();
}

function getPago(idSucursal, fecha) {
  return Model.aggregate([
    {
      $match: {
        idSucursal: idSucursal,
        $or: [
          { "tipoPago.descripcion": "EFECTIVO" },
          { "tipoPago.descripcion": "EFECTIVO Y TARJETA" },
          { "tipoPago.descripcion": "CUENTA CORRIENTE" }
        ]
      }
    },
    {
      $unwind: {
        path: "$pago",
        preserveNullAndEmptyArrays: true
      }
    }, 
    {
      $match: {
        "pago.fecha": {
          $gte: fecha !== undefined ? fecha : new Date(0) // Filtro de fecha si no es undefined, de lo contrario, no apliques el filtro (nunca coincide).
        }
      }
    } 
  ])
  .exec();
}

function getTotalVenta(query) {
  const fechaInicio = new Date(query.fechaInicio);
  const fechaFinal = new Date(query.fechaFinal);

  const matchFilter = {
    fecha: {
      $gte: fechaInicio,
      $lte: fechaFinal,
    },
  };

  if (query.sucursales && query.sucursales.length > 0) {
    matchFilter.idSucursal = {
      $in: query.sucursales,
    };
  }

  if (query.tipoPago && query.tipoPago.length > 0) {
    matchFilter['tipoPago.descripcion'] = {
      $in: query.tipoPago,
    };
  }

  if (query.obraSociales && query.obraSociales.length > 0) {
    matchFilter['obraSocial._id'] = {
      $in: query.obraSociales,
    };
  }

  return Model.aggregate([
    {
      $lookup: {
        from: "ordens",
        localField: "idOrden",
        foreignField: "_id",
        as: "orden",
      },
    },
    {
      $unwind: {
        path: "$orden",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "obrasocials",
        localField: "orden.idObraSocial",
        foreignField: "_id",
        as: "obraSocial",
      },
    },
    {
      $unwind: {
        path: "$obraSocial",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "sucursals",
        localField: "idSucursal",
        foreignField: "_id",
        as: "sucursal",
      },
    },
    {
      $unwind: {
        path: "$sucursal",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: matchFilter,
    },
  ]).exec();
}

function getTotalLastVenta(query) {
  const fechaInicio = new Date(query.fechaInicio);
  const fechaFinal = new Date(query.fechaFinal);

  fechaInicio.setMonth(fechaInicio.getMonth() - 1);
  fechaFinal.setMonth(fechaFinal.getMonth() - 1);

  const matchFilter = {
    fecha: {
      $gte: fechaInicio,
      $lte: fechaFinal,
    },
  };

  if (query.sucursales && query.sucursales.length > 0) {
    matchFilter.idSucursal = {
      $in: query.sucursales,
    };
  }

  if (query.tipoPago && query.tipoPago.length > 0) {
    matchFilter['tipoPago.descripcion'] = {
      $in: query.tipoPago,
    };
  }

  if (query.obraSociales && query.obraSociales.length > 0) {
    matchFilter['obraSocial._id'] = {
      $in: query.obraSociales,
    };
  }else{
    matchFilter.$or = [
      { 'obraSocial._id': { $in: query.obraSociales } },
      { idOrden: null },
    ];
  }


  return Model.aggregate([
    {
      $lookup: {
        from: "ordens",
        localField: "idOrden",
        foreignField: "_id",
        as: "orden",
      },
    },
    {
      $unwind: {
        path: "$orden",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "obrasocials",
        localField: "orden.idObraSocial",
        foreignField: "_id",
        as: "obraSocial",
      },
    },
    {
      $unwind: {
        path: "$obraSocial",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "sucursals",
        localField: "idSucursal",
        foreignField: "_id",
        as: "sucursal",
      },
    },
    {
      $unwind: {
        path: "$sucursal",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $match: matchFilter,
    },
  ]).exec();
}


function patchVenta(idVenta, venta) {
    return Model.updateOne(
        {_id: idVenta},
        {$set: venta}
    )
}

module.exports = {
    add: addVenta,
	  get: getVenta,
    patch: patchVenta,
    getLastCC,
    getDineroIngresado,
    getPago,
    getLastRetiro,
    getTotalVenta,
    getTotalLastVenta
}
