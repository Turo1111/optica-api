const Model = require('./model');

function addCierreCaja(cierreCaja) {
    const cc = new Model(cierreCaja);
    return cc.save();
}

function findExist(idSucursal, fecha) {
    return Model.findOne({
        idSucursal: idSucursal,
        fecha: fecha
    });
}

function getCierreCaja() {
    return Model.aggregate(
		[
			{
                $lookup: {
                 from: "sucursals",
                 localField:  "idSucursal" ,
                 foreignField: "_id",
                 as: "sucursal"
                }
            },
            {
                $unwind: {
                    path: "$sucursal",
                    preserveNullAndEmptyArrays: true
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
                $unwind: {
                    path: "$empleado",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $project: {
                    fecha: 1,
                    totalEsperado: 1,
                    total: 1,
                    empleado: "$empleado.usuario",
                    sucursal: "$sucursal.descripcion",
                }
            }  /* */
		]
	)
}

function getLastDate(idSucursal) {
    return Model.findOne({ idSucursal })
    .sort({ fecha: -1 }) // Ordena en orden descendente para obtener el último cierre
    .exec(); 
}

module.exports = {
    add: addCierreCaja,
	get: getCierreCaja,
    find: findExist,
    getLastDate
}