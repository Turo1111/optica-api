const Model = require('./model');

function addStock(stock) {
    const s = new Model(stock);
    return s.save();
}

function getStock() {
    return Model.find()
}

function patchStock(idStock, stock) {
    return Model.updateOne(
        {_id: idStock},
        {$set: stock}
    )
}

module.exports = {
    add: addStock,
	get: getStock,
    patch: patchStock
}