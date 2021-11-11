const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const dotenv = require('dotenv').config();

io.on('connection', client => {

    client.on('chat', (data) => {
        io.emit('chatData', data);
    });

    client.on('clearFeedBack', () => {
        io.emit('clearFeedBack');
    });

    client.on('typing', ({handle}) => {
        client.broadcast.emit('typingData', `${handle} is typing..`);
    });

});

app.use(express.static('public'));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`listening to requests on ports ${PORT}`)
});