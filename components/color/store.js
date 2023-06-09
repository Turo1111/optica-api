const Model = require('./model');

function addColor(color) {
    const col = new Model(color);
    return col.save();
}

function findExist(descripcion) {
    return Model.findOne({descripcion: descripcion});
}

function getColor() {
    return Model.find()
}

function patchColor(idColor, color) {
    return Model.updateOne(
        {_id: idColor},
        {$set: color}
    )
}

module.exports = {
    add: addColor,
	get: getColor,
    patch: patchColor,
    find: findExist,
}