const Model = require('./model');

function addProducto(producto) {
    const product = new Model(producto);
    return product.save();
}

function getProducto() {
    return Model.find()
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
    patch: patchProducto
}