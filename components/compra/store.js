const Model = require('./model');

function addCompra(compra) {
    const compr = new Model(compra);
    return compr.save();
}

function getCompra() {
    return Model.aggregate([
        {
            $lookup: {
                from: "proveedors",
                localField: "idProveedor",
                foreignField: "_id",
                as: "proveedor"
            }
        },
        {
            $unwind: {
                path: "$proveedor",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "sucursals",
                localField: "idSucursal",
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
             from: "lineacompras",
             localField:  "_id" ,
             foreignField: "idCompra",
             as: "cantidadProductos"
            }
        },
        {
            $project: {
                total: 1,
                proveedor: '$proveedor.descripcion',
                sucursal: '$sucursal.descripcion',
                fecha: 1,
                cantidadProductos: { $size: '$cantidadProductos' },
            }
        }
    ])
}

function patchCompra(idCompra, compra) {
    return Model.updateOne(
        {_id: idCompra},
        {$set: compra}
    )
}

module.exports = {
    add: addCompra,
	get: getCompra,
    patch: patchCompra
}