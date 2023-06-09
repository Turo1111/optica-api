const Model = require('./model');

function addEmpleado(empleado) {
    const em = new Model(empleado);
    return em.save();
}

function findExist(usuario) {
    return Model.findOne({usuario: usuario});
}

function getEmpleado() {
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
                $lookup: {
                 from: "roles",
                 localField:  "idRol" ,
                 foreignField: "_id",
                 as: "rol"
                }
            },
            {
                $project: {
                    nombreCompleto: 1,
                    direccion: 1,
                    telefono: 1,
                    estado: 1,
                    sucursal: "$sucursal.descripcion",
                    rol: "$rol.descripcion",
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
                    path: "$rol",
                    preserveNullAndEmptyArrays: true
                }
            }
		]
	)
}

function loginEmpleado(usuario) {
    return Model.findOne({usuario: usuario})
}

function patchEmpleado(idEmpleado, empleado) {
    return Model.updateOne(
        {_id: idEmpleado},
        {$set: empleado}
    )
}

module.exports = {
    add: addEmpleado,
	get: getEmpleado,
    patch: patchEmpleado,
    find: findExist,
    login: loginEmpleado
}