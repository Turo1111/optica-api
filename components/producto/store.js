const Model = require('./model');

function addProducto(producto) {
    const product = new Model(producto);
    return product.save();
}

function findExist(codigo) {
    return Model.findOne({codigo: codigo});
}

function getProducto() {
    return Model.aggregate(
        [
            {
                $lookup: {
                    from: "categorias",
                    localField: "idCategoria",
                    foreignField: "_id",
                    as: "categoria"
                }
            },
            {
                $lookup: {
                    from: "marcas",
                    localField: "idMarca",
                    foreignField: "_id",
                    as: "marca"
                }
            },
            {
                $lookup: {
                    from: "proveedors",
                    localField: "idProveedor",
                    foreignField: "_id",
                    as: "proveedor"
                }
            },
            {
                $lookup: {
                    from: "colors",
                    localField: "idColor",
                    foreignField: "_id",
                    as: "color"
                }
            },
            {
                $lookup: {
                    from: "obrasocials",
                    localField: "_id",
                    foreignField: "productosDescuento",
                    as: "obrasSocialesDescuento"
                }
            },
            {
                $project: {
                    descripcion: 1,
                    codigo: 1,
                    imagen: 1,
                    numeracion: 1,
                    alto: 1,
                    ancho: 1,
                    precioGeneral: 1,
                    marca: { $ifNull: ["$marca.descripcion", null] },
                    categoria: "$categoria.descripcion",
                    idCategoria: "$categoria._id",
                    color: { $ifNull: ["$color.descripcion", null] },
                    proveedor: { $ifNull: ["$proveedor.descripcion", null] },
                    obrasSocialesDescuento: "$obrasSocialesDescuento.descripcion"
                }
            },
            {
                $unwind: {
                    path: "$categoria",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$proveedor",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$idCategoria",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$marca",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$color",
                    preserveNullAndEmptyArrays: true
                }
            },
        ]
    );
}

function getWStock(idSucursal) {
    return Model.aggregate(
        [
            {
                $lookup: {
                    from: "categorias",
                    localField: "idCategoria",
                    foreignField: "_id",
                    as: "categoria"
                }
            },
            {
                $lookup: {
                    from: "proveedors",
                    localField: "idProveedor",
                    foreignField: "_id",
                    as: "proveedor"
                }
            },
            {
                $lookup: {
                    from: "marcas",
                    localField: "idMarca",
                    foreignField: "_id",
                    as: "marca"
                }
            },
            {
                $lookup: {
                    from: "colors",
                    localField: "idColor",
                    foreignField: "_id",
                    as: "color"
                }
            },
            {
                $lookup: {
                    from: "obrasocials",
                    localField: "_id",
                    foreignField: "productosDescuento",
                    as: "obrasSocialesDescuento"
                }
            },
            {
                $project: {
                    descripcion: 1,
                    codigo: 1,
                    imagen: 1,
                    numeracion: 1,
                    alto: 1,
                    ancho: 1,
                    precioGeneral: 1,
                    marca: { $ifNull: ["$marca.descripcion", null] },
                    categoria: "$categoria.descripcion",
                    color: { $ifNull: ["$color.descripcion", null] },
                    obrasSocialesDescuento: "$obrasSocialesDescuento.descripcion",
                    stock: 1,
                    proveedor: { $ifNull: ["$proveedor.descripcion", null] },
                }
            },
            {
                $unwind: {
                    path: "$categoria",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$marca",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$proveedor",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $unwind: {
                    path: "$color",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    "categoria": { $eq: "LENTE" }
                }
            },
            {
                $lookup: {
                    from: "stocks",
                    localField: "_id",
                    foreignField: "idProducto",
                    as: "stock"
                }
            }, 
            {
                $unwind: {
                    path: "$stock",
                    preserveNullAndEmptyArrays: true
                }
            },
            {
                $match: {
                    "stock.idSucursal": idSucursal // Filtrar por la sucursal deseada en el stock
                }
            }
        ]
    );
}

function patchProducto(idProducto, producto) {
    return Model.updateOne(
        {_id: idProducto},
        {$set: producto}
    )
}

module.exports = {
    add: addProducto,
	get: getProducto,
    patch: patchProducto,
    find: findExist,
    getWStock: getWStock
}