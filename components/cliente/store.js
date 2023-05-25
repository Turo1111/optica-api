const Model = require('./model');

function addCliente(cliente) {
    const client = new Model(cliente);
    return client.save();
}

function findExist(dni) {
    return Model.findOne({dni: dni});
}

function getCliente() {
    return Model.find()
}

function patchCliente(idCliente, cliente) {
    return Model.updateOne(
        {_id: idCliente},
        {$set: cliente}
    )
}

module.exports = {
    add: addCliente,
	get: getCliente,
    patch: patchCliente,
    find: findExist,
}