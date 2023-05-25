const Model = require('./model');

function addVenta(venta) {
    const vent = new Model(venta);
    return vent.save();
}

function getVenta() {
    return Model.find()
}

function patchVenta(idVenta, venta) {
    return Model.updateOne(
        {_id: idVenta},
        {$set: venta}
    )
}

module.exports = {
    add: addVenta,
	get: getVenta,
    patch: patchVenta
}