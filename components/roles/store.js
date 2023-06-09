const Model = require('./model');

function addRol(rol) {
    const r = new Model(rol);
    return r.save();
}

function getRol() {
    return Model.find()
}

function patchRol(idRol, rol) {
    return Model.updateOne(
        {_id: idRol},
        {$set: rol}
    )
}

module.exports = {
    add: addRol,
	get: getRol,
    patch: patchRol
}