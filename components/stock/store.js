const Model = require('./model');

function addStock(stock) {
    const s = new Model(stock);
    return s.save();
}

function getStock(idProducto) {
    return Model.aggregate([
        {
            $match: {
                idProducto: idProducto
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
                cantidad: 1,
                precioEfectivo: 1,
                precioLista: 1,
                sucursal: "$sucursal.descripcion",
            }
        },
        {
            $unwind: {
                path: "$sucursal",
                preserveNullAndEmptyArrays: true
            }
        }
    ]);
}

function patchStock(idStock, stock) {
    return Model.updateOne(
        {_id: idStock},
        {$set: stock}
    )
}

module.exports = {
    add: addStock,
	get: getStock,
    patch: patchStock
}

			/* {
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
            },  */