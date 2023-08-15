const Model = require('./model');

function addCliente(cliente) {
    const client = new Model(cliente);
    return client.save();
}

function findExist(dni) {
    return Model.findOne({dni: dni});
}

function getCliente() {
    return Model.aggregate([
        {
            $lookup: {
                from: "senias",
                localField: "_id",
                foreignField: "idCliente",
                as: "senia"
            }
        },
        {
            $lookup: {
                from: "ventas",
                localField: "_id",
                foreignField: "idCliente",
                as: "venta"
            }
        },
        {
            $project: {
                nombreCompleto: 1,
                telefono: 1,
                dni: 1,
                senia: { $ifNull: ["$senia", null] },
                venta: {
                    $filter: {
                        input: "$venta",
                        as: "ventaItem",
                        cond: { $lt: ["$$ventaItem.dineroIngresado", "$$ventaItem.total"] }
                    }
                }
            }
        },
        {
            $unwind: {
                path: "$senia",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $addFields: {
                venta: {
                    $map: {
                        input: "$venta",
                        as: "ventaItem",
                        in: {
                            _id: "$$ventaItem._id",
                            total: "$$ventaItem.total",
                            diferencia: { $subtract: ["$$ventaItem.total", "$$ventaItem.dineroIngresado"] }
                        }
                    }
                }
            }
        },
        {
            $project: {
                nombreCompleto: 1,
                telefono: 1,
                dni: 1,
                senia: 1,
                cuentaCorriente: { $sum: "$venta.diferencia" }
            }
        }
    ]);
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