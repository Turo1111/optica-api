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
    permisos: [{
        screen: {
            type : String,
            required: true,
        },
        lectura: {
            type : Boolean,
            required: true,
        },
        escritura: {
            type : Boolean,
            required: true,
        }
    }],
});

const model = mongoose.model('Roles', mySchema);
module.exports = model;