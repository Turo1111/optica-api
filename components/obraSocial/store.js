const Model = require('./model');

function addObraSocial(obraSocial) {
    const obs = new Model(obraSocial);
    return obs.save();
}

function getObraSocial() {
    return Model.find()
}

function patchObraSocial(idObraSocial, obraSocial) {
    return Model.updateOne(
        {_id: idObraSocial},
        {$set: obraSocial}
    )
}

module.exports = {
    add: addObraSocial,
	get: getObraSocial,
    patch: patchObraSocial
}