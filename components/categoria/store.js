const Model = require('./model');

function addCategoria(categoria) {
    const cat = new Model(categoria);
    return cat.save();
}

function getCategoria() {
    return Model.find()
}

function patchCategoria(idCategoria, descripcion) {
    return Model.updateOne(
        {_id: idCategoria},
        {$set: descripcion}
    )
}

module.exports = {
    add: addCategoria,
	get: getCategoria,
    patch: patchCategoria
}