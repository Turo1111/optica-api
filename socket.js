const Server = require('socket.io');
const controller = require('./components/registros/controller');
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
		if (params.res._id) {
			controller.addReg({
				coleccion: type,
				accion: params.action,
				idColeccion: params.res._id,
				fechaHora: fechaHora
			})
		}
		getIO().emit(type, params);
	} catch (error) {
		console.log(error);
	}
}
module.exports = {
    init,
    getIO,
    emitSocket
}