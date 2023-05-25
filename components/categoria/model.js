const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
    },
    descripcion: {
        type: String,
        required: true,
    },
    subCategoria: {
        type: Array,
    }
});

const model = mongoose.model('Categoria', mySchema);
module.exports = model;