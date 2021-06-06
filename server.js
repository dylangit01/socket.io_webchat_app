const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Server is running???');
});

// Build up io connection
io.on('connection', (socket) => {
	socket.emit('me', socket.id); // Provide self id to frontend

	socket.on('disconnect', () => {
		socket.broadcast.emit('callEnded');
	});

	socket.on('callUser', ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit('callUser', { signal: signalData, from, name });
	});

	socket.on('answerCall', (data) => {
		io.to(data.to).emit('callAccepted', data.signal);
	});
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
