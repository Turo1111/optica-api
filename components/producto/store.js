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
                 localField:  "idCategoria" ,
                 foreignField: "_id",
                 as: "categoria"
                }
            },
			{
                $lookup: {
                 from: "marcas",
                 localField:  "idMarca" ,
                 foreignField: "_id",
                 as: "marca"
                }
            },
            {
                $lookup: {
                 from: "colors",
                 localField:  "idColor" ,
                 foreignField: "_id",
                 as: "color"
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
                    color: { $ifNull: ["$color.descripcion", null] }
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
                    path: "$color",
                    preserveNullAndEmptyArrays: true
                }
            } /* */
		]
	)
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
    find: findExist
}