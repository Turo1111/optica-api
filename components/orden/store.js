const Model = require('./model');

function addOrden(orden) {
    const or = new Model(orden);
    return or.save();
}

function getOrden() {
    return Model.find()
}

function patchOrden(idOrden, orden) {
    return Model.updateOne(
        {_id: idOrden},
        {$set: orden}
    )
}

module.exports = {
    add: addOrden,
	get: getOrden,
    patch: patchOrden
}