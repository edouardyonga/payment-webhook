
const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const server = app.listen(8080, () => {
    console.log('Socket.IO server listening on port 8080');
});

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

app.get('/callback', (req, res) => {
    const { status } = req.query;
    console.log(req.query);

    if (!status) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }

    if (status === 'SUCCESSFUL') {
        io.emit('paymentStatus', req.query);

    } else if (status === 'FAILED') {
        io.emit('paymentStatus', req.query);
    } else {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    res.status(200).end();
});

io.on('connection', (socket) => {
    console.log('A client connected.');

    socket.on('disconnect', () => {
        console.log('A client disconnected.');
    });
});