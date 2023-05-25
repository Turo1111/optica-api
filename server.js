const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const {init} = require('./socket');
const router = require('./network/routes');

const app = express();

const server = require('http').Server(app)

const options = {
	allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
	credentials: true,
	origin: '*',
	preflightContinue: false,
};

app.use(cors(options));
app.use(express.static('public'));

db('mongodb+srv://turo:afwvf6gZ8ibxpWju@opticatest.kn9rafv.mongodb.net/?retryWrites=true&w=majority');
app.use(bodyParser.json());
router(app);

const port = 3001;
server.listen(port, () => {
	console.log(`Listening on port ${port}...`);
	const io = init(server);
	io.on('connection', () => {
		console.log('Client connected!');
	});
});