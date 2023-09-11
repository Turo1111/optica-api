const Model = require('./model');

function addReg(reg) {
    const r = new Model(reg);
    return r.save();
}

function getReg() {
    return Model.find().sort({ fechaHora: -1 });
}

module.exports = {
    add: addReg,
	get: getReg,
}