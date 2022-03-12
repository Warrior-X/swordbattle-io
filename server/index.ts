import express, { application } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const server = express();
const http = createServer(server);
const io = new Server(http, {cors: {origin: "*"}});

server.use(cors())

io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);

    socket.on('disconnect', function () {
        console.log('A user disconnected: ' + socket.id);
    });
});

http.listen(5000, function () {
    console.log('Server started!');
});
