const Model = require('./model');

function addLineaCompra(lineaCompra) {
    const lc = new Model(lineaCompra);
    return lc.save();
}

function getLineaCompra(idCompra) {
    return Model.aggregate([
        {
            $match: {
                idCompra: idCompra
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
                precio: 1,
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

function patchLineaCompra(idLineaCompra, lineaCompra) {
    return Model.updateOne(
        {_id: idLineaCompra},
        {$set: lineaCompra}
    )
}

module.exports = {
    add: addLineaCompra,
	get: getLineaCompra,
    patch: patchLineaCompra
}