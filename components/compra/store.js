const Model = require('./model');

function addCompra(compra) {
    const compr = new Model(compra);
    return compr.save();
}

function getCompra() {
    return Model.find()
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