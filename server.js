const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');
const {init} = require('./socket');
const router = require('./network/routes');
require('dotenv').config();
const port = process.env.PORT;
const dbUrl = process.env.DB_URL;

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

db(dbUrl);
app.use(bodyParser.json());
router(app);

server.listen(port, () => {
	console.log(`Listening on port ${port}...`);
	const io = init(server);
	io.on('connection', () => {
		console.log('Client connected!');
	});
});