import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import { ApiPlayer } from "../client/src/scripts/api/player";
import { Vector } from "../client/src/scripts/api/vector";

const server = express();
const http = createServer(server);
const io = new Server(http, { cors: { origin: "*" } });

server.use(cors());
let players: ApiPlayer[] = [];

const addPlayer = (id: string) => {
    const newPlayer = new ApiPlayer(id);
    players.push(newPlayer)
    return newPlayer;
}

io.on("connection", function (socket) {
    console.log("A user connected: " + socket.id);
    io.to(socket.id).emit("data", socket.id);
    // const player = addPlayer(socket.id);
    const player = new ApiPlayer(socket.id)
    socket.broadcast.emit("playerJoined", player)

    socket.on("disconnect", function () {
        console.log("A user disconnected: " + socket.id);
        players = players.filter((player) => player.id != socket.id);
    });

    socket.on("playerMoved", (id: string, newPos: Vector) => {
        socket.broadcast.emit("playerMoved", id, newPos);
    })
});

http.listen(5000, function () {
    console.log("Server started!");
});
