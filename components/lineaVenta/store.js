const Model = require('./model');

function addLineaVenta(lineaVenta) {
    const lv = new Model(lineaVenta);
    return lv.save();
}

function getLineaVenta(idVenta) {
    return Model.aggregate([
        {
            $match: {
                idVenta: idVenta
            }
        },
        {
            $lookup: {
             from: "productos",
             localField:  "idProducto" ,
             foreignField: "_id",
             as: "producto"
            }
        },
        {
            $project: {
                cantidad: 1,
                total: 1,
                descripcion: "$producto.descripcion",
            }
        },
        {
            $unwind: {
                path: "$descripcion",
                preserveNullAndEmptyArrays: true
            }
        }
    ]);
}

function patchLineaVenta(idLineaVenta, lineaVenta) {
    return Model.updateOne(
        {_id: idLineaVenta},
        {$set: lineaVenta}
    )
}

module.exports = {
    add: addLineaVenta,
	get: getLineaVenta,
    patch: patchLineaVenta
}