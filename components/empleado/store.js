const Model = require('./model');

function addEmpleado(empleado) {
    const em = new Model(empleado);
    return em.save();
}

function findExist(usuario) {
    return Model.findOne({usuario: usuario});
}

function getEmpleado() {
    return Model.find()
}

function loginEmpleado(usuario) {
    return Model.findOne({usuario: usuario})
}

function patchEmpleado(idEmpleado, empleado) {
    return Model.updateOne(
        {_id: idEmpleado},
        {$set: empleado}
    )
}

module.exports = {
    add: addEmpleado,
	get: getEmpleado,
    patch: patchEmpleado,
    find: findExist,
    login: loginEmpleado
}