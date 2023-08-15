const Model = require('./model');

function addOferta(oferta) {
    const ofer = new Model(oferta);
    return ofer.save();
}

function findExist(idProducto, fechaInicio, fechaFinal) {
    return Model.findOne({
        idProducto: idProducto,
        $or: [
            { fechaInicio: { $lte: fechaInicio }, fechaFinal: { $gte: fechaInicio } },
            { fechaInicio: { $lte: fechaFinal }, fechaFinal: { $gte: fechaFinal } }
        ]
    });
}

function getOferta(idProducto) {
    return Model.find({idProducto: idProducto})
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