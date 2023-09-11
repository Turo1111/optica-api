const Model = require('./model');

function addProveedor(proveedor) {
    const col = new Model(proveedor);
    return col.save();
}

function findExist(descripcion) {
    return Model.findOne({descripcion: descripcion});
}

function getProveedor() {
    return Model.find()
}

function patchProveedor(idProveedor, proveedor) {
    return Model.updateOne(
        {_id: idProveedor},
        {$set: proveedor}
    )
}

module.exports = {
    add: addProveedor,
	get: getProveedor,
    patch: patchProveedor,
    find: findExist,
}