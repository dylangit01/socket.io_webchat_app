const express = require('express');
const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
	cors: {
		origin: '*',
		method: ['GET', 'POST'],
	},
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Server is running')
})







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}!`);
});
