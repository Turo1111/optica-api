const Model = require('./model');

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
                    obraSocialDescripcion: "$obraSocial.descripcion"
                }
            }  /* */
		]
	)
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
    patch: patchVenta
}