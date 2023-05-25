const Model = require('./model');

function addOferta(oferta) {
    const ofer = new Model(oferta);
    return ofer.save();
}

function findExist(idProducto) {
    return Model.findOne({idProducto: idProducto});
}

function getOferta() {
    return Model.find()
}

function patchOferta(idOferta, oferta) {
    return Model.updateOne(
        {_id: idOferta},
        {$set: oferta}
    )
}

module.exports = {
    add: addOferta,
	get: getOferta,
    patch: patchOferta,
    find: findExist
}