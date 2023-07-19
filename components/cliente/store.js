const Model = require('./model');

function addCliente(cliente) {
    const client = new Model(cliente);
    return client.save();
}

function findExist(dni) {
    return Model.findOne({dni: dni});
}

function getCliente() {
    return Model.aggregate(
		[
			{
                $lookup: {
                 from: "senias",
                 localField:  "_id" ,
                 foreignField: "idCliente",
                 as: "senia"
                }
            },
            {
                $project: {
                    nombreCompleto: 1,
                    telefono: 1,
                    dni: 1,
                    senia: { $ifNull: ["$senia", null] }
                }
            },
            {
                $unwind: {
                    path: "$senia",
                    preserveNullAndEmptyArrays: true
                }
            }
		]
	)
}

function patchCliente(idCliente, cliente) {
    return Model.updateOne(
        {_id: idCliente},
        {$set: cliente}
    )
}

module.exports = {
    add: addCliente,
	get: getCliente,
    patch: patchCliente,
    find: findExist,
}