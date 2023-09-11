const Model = require('./model');

function addRetiroDinero(retirodinero) {
    const cc = new Model(retirodinero);
    return cc.save();
}

function findExist(idSucursal, fecha) {
    return Model.findOne({
        idSucursal: idSucursal,
        fecha: fecha
    });
}

function getRetiroDinero() {
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
                    total: 1,
                    empleado: "$empleado.usuario",
                    sucursal: "$sucursal.descripcion",
                }
            }  /* */
		]
	)
}

module.exports = {
    add: addRetiroDinero,
	get: getRetiroDinero,
    find: findExist
}