const Model = require('./model');

function addSenia(senia) {
    const obs = new Model(senia);
    return obs.save();
}

function findExist(idCliente) {
    return Model.find({idCliente: idCliente});
}

function getSenia(idCliente) {
    return Model.find({idCliente: idCliente})
}

function patchSenia(idSenia, senia) {
    return Model.updateOne(
        {_id: idSenia},
        {$set: senia}
    )
}

module.exports = {
    add: addSenia,
	get: getSenia,
    patch: patchSenia,
    find: findExist
}