const store = require('./store');
const mongoose = require('mongoose');


function addColor(color) {
    if (!color) {
        return Promise.reject('Invalid user list');
    } 

    return store.add(color);
}

function getColor() {
    return store.get();
}


function patchColor(idColor, color) {
    return store.patch(idColor, color);
}


module.exports = {
    addColor,
    getColor,
    patchColor
}