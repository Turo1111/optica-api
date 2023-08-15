const store = require('./store');
const mongoose = require('mongoose');


function addReg(reg) {
    if (!reg) {
        return Promise.reject('Invalid user list');
    } 

    return store.add(reg);
}

function getReg() {
    return store.get();
}



module.exports = {
    addReg,
    getReg
}