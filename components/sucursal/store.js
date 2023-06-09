const Model = require('./model');

function addSucursal(sucursal) {
    const suc = new Model(sucursal);
    return suc.save();
}

function getSucursal() {
    return Model.find()
}

function patchSucursal(idSucursal, sucursal) {
    return Model.updateOne(
        {_id: idSucursal},
        {$set: sucursal}
    )
}

module.exports = {
    add: addSucursal,
	get: getSucursal,
    patch: patchSucursal
}