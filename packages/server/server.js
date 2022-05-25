import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const port = process.env.PORT || 3005;
const server = http.createServer(express);

const io = new Server(server, { cors: { origin: '*' } });

let players = [];

io.on('connection', (socket) => {
  // console.log('A player connected');

  let playerId = socket.id;

  socket.emit('player', playerId);

  //JOIN & CONNECTION LOGIC
  socket.on('join room', (data) => {
    console.log('Player joined room', data);

    socket.emit('join ok', {
      ...data,
      roomId: 1,
    });
  });

  io.on('connection', (socket) => {
    socket.join('1');
  });

  players.push(playerId);
  // players.push({ id: playerId, name: "", avatar: '' });

  socket.on('disconnect', function () {
    console.log('A player disconnected');
    players = players.filter((p) => {
      return p != socket.id;
    });
  });

  //CHAT LOGIC
  socket.on('send message', (data) => {
    console.log(data);

    io.to('1').emit('received message', data);
  });

  //TURN LOGIC
  socket.on('pass_turn', (player) => {
    let nrOfPlayers = Object.values(players).length;
    // console.log(player);

    let playerNr = players.findIndex((p) => p == player);
    // console.log(playerNr);

    // console.log({ players });

    if (playerNr + 1 < nrOfPlayers) {
      io.emit('turn', players[playerNr + 1]);
    } else {
      io.emit('turn', players[0]);
    }
  });
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
