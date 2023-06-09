const store = require('./store');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

function addEmpleado(empleado) {
    if (!empleado) {
        return Promise.reject('Invalid user list');
    } 

    return store.add({
        ...empleado, 
        idSucursal: new mongoose.Types.ObjectId(empleado.idSucursal),
        idRol: new mongoose.Types.ObjectId(empleado.idRol),
        password: bcrypt.hashSync(empleado.password, 10)
    });
}

function findExist(usuario) {
    if (!usuario) {
        return Promise.reject('Invalid user list');
    } 

    return store.find(usuario);
}

function getEmpleado() {
    return store.get();
}

function loginEmpleado(usuario) {
    return store.login(usuario)
}


function patchEmpleado(idEmpleado, empleado) {
    return store.patch(idEmpleado, empleado);
}


module.exports = {
    addEmpleado,
    getEmpleado,
    loginEmpleado,
    patchEmpleado,
    findExist
}