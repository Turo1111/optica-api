const Model = require('./model');

function addRol(rol) {
    const r = new Model(rol);
    return r.save();
}

function getRol() {
    return Model.aggregate(
		[
            {
                $lookup: {
                 from: "empleados",
                 localField:  "_id" ,
                 foreignField: "idRol",
                 as: "empleados"
                }
            },
            {
              $project: {
                _id: 1,
                descripcion: 1,
                permisos: 1,
                totalEmpleados: { $size: '$empleados' },
              },
            }
		]
	)
}

function patchRol(idRol, rol) {
    return Model.updateOne(
        {_id: idRol},
        {$set: rol}
    )
}

module.exports = {
    add: addRol,
	get: getRol,
    patch: patchRol
}