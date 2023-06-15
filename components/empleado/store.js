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
                    usuario: 1,
                    sucursal: "$sucursal.descripcion",
                    roles: "$rol.descripcion",
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
                    path: "$roles",
                    preserveNullAndEmptyArrays: true
                }
            }
		]
	)
}

function loginEmpleado(usuario) {
    return Model.aggregate([
        {
            $match: {
                usuario: usuario
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
             from: "roles",
             localField:  "idRol" ,
             foreignField: "_id",
             as: "rol"
            }
        },
        {
            $project: {
                usuario: 1,
                password: 1,
                sucursal: "$sucursal.descripcion",
                roles: "$rol",
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
                path: "$roles",
                preserveNullAndEmptyArrays: true
            }
        }
    ]);
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