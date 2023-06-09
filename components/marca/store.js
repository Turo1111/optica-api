const Model = require('./model');

function addMarca(marca) {
    const mar = new Model(marca);
    return mar.save();
}

function findExist(descripcion) {
    return Model.findOne({descripcion: descripcion});
}

function getMarca() {
    return Model.find()
}

function patchMarca(idMarca, marca) {
    return Model.updateOne(
        {_id: idMarca},
        {$set: marca}
    )
}

module.exports = {
    add: addMarca,
	get: getMarca,
    patch: patchMarca,
    find: findExist,
}