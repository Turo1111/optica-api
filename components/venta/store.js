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
                $project: {
                    fecha: 1,
                    observacion: 1,
                    tipoPago: 1,
                    total: 1,
                    cliente: 1,
                    empleado: 1,
                    sucursal: 1,
                    orden: { $ifNull: ["$orden", null] }
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