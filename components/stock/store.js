const Model = require('./model');

function addStock(stock) {
    const s = new Model(stock);
    return s.save();
}

function findExist(idSucursal, idProducto) {
    return Model.findOne({
        idSucursal: idSucursal,
        idProducto: idProducto
    });
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
                idProducto: 1,
                idSucursal: 1
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
    patch: patchStock,
    find: findExist

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