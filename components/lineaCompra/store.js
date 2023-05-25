const Model = require('./model');

function addLineaCompra(lineaCompra) {
    const lc = new Model(lineaCompra);
    return lc.save();
}

function getLineaCompra() {
    return Model.find()
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