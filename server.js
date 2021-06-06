const express = require('express');
const app = express();

// For using socket.io, using server.listen, instead of using app.listen at the bottom
const server = require('http').createServer(app);
// CORS is necessary to setup socket.io and server
const cors = require('cors');

// Setup socket.io
const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Server is running');
});

// Build up io actions which will be sent out to frontend
io.on('connection', (socket) => {
	socket.emit('me', socket.id); // Provide self id to frontend

	// If frontend ends call, then socket disconnects
	// ! Frontend actions must match the name of emit
	socket.on('disconnect', () => {
		socket.broadcast.emit('callEnded');
	});

	// For calling user, send { signal(signalData), from, name } object to frontend
	// userToCall is the id of the user that will be called
	socket.on('callUser', ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit('callUser', { signal: signalData, from, name });
	});

	// For other user when received the call, if callAccepted, then will send out the data.signal
	socket.on('answerCall', (data) => {
		io.to(data.to).emit('callAccepted', data.signal);
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
