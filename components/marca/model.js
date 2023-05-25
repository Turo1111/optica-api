const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
    },
    descripcion: {
        type: String,
        required: true,
    }
});

const model = mongoose.model('Marca', mySchema);
module.exports = model;