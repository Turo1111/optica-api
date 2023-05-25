const Server = require('socket.io');

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