const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
    },
    fecha: {
        type: Date,
        required: true,
    },
    descuento: {
        type: Number,
    },
    subTotal: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    dineroIngresado: {
        type: Number,
    },
    observacion: {
        type: String,
    },
    estado: {
        type: String,
    },
    useSenia: {
        type: Boolean,
    },
    pago: [{
        total: {
            type: Number,
        },
        fecha: {
            type: Date,
        },
    }],
    tipoPago: {
        descripcion: {
            type: String,
            required: true,
        },
        banco: {
            type: String,
        },
        cuotas: {
            type: String,
        },
    },
    idEmpleado : {
        type: Schema.ObjectId,
        ref: 'Empleado',
        required: true,
    },
    idSucursal : {
        type: Schema.ObjectId,
        ref: 'Sucursal',
        required: true,
    },
    idCliente : {
        type: Schema.ObjectId,
        ref: 'Cliente'
    },
    idOrden : {
        type: Schema.ObjectId,
        ref: 'Orden'
    }
});

const model = mongoose.model('Venta', mySchema);
module.exports = model;