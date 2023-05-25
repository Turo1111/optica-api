const Model = require('./model');

function addLineaVenta(lineaVenta) {
    const lv = new Model(lineaVenta);
    return lv.save();
}

function getLineaVenta() {
    return Model.find()
}

function patchLineaVenta(idLineaVenta, lineaVenta) {
    return Model.updateOne(
        {_id: idLineaVenta},
        {$set: lineaVenta}
    )
}

module.exports = {
    add: addLineaVenta,
	get: getLineaVenta,
    patch: patchLineaVenta
}