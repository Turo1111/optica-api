const Server = require('socket.io');

const mongoose = require('mongoose');

let io;

function init(httpServer) {
	io = Server(httpServer, {
		method: 'GET',
		cors: {
			origin: '*',
		},
	});
	return io;
}

function getIO() {
	if (!io) {
		throw new Error('Socket IO not defined!');
	}
	return io;
}

function emitSocket(type, params) {
	try {
		const fechaHora = new Date()
		addReg({
			coleccion: type,
			accion: params.action,
			idColeccion: params.data._id,
			fechaHora: fechaHora
		})
		getIO().emit(type, params);
	} catch (error) {
		console.log(error);
	}
}

const Schema = mongoose.Schema;

const mySchema = new Schema({
    id: {
        type: Schema.ObjectId,
    },
    coleccion: {
        type: String,
        required: true,
    },
    idColeccion: {
        type: Schema.ObjectId,
		required: true,
    },
    accion: {
        type: String,
		required: true,
    },
    fechaHora: {
        type: Date,
		required: true,
    }
});

const Model = mongoose.model('Registro', mySchema);

function addReg(reg) {
	console.log(reg)
    const r = new Model(reg);
    return r.save();
}

module.exports = {
    init,
    getIO,
    emitSocket
}