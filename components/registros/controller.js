const store = require('./store');
const mongoose = require('mongoose');
const moment = require('moment-timezone');


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