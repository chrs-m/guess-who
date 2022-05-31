import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const port = process.env.PORT || 3005;
const server = http.createServer(express);

const io = new Server(server, { cors: { origin: '*' } });

let players = [];

io.on('connection', (socket) => {
  let playerId = socket.id;

  let playerIndex = players.findIndex((p) => p.id == socket.id);

  if (playerIndex === -1) {
    socket.emit('player', { id: playerId, name: '', avatar: '' });
    players.push({ id: playerId, name: '', avatar: '' });
  }

  //JOIN & CONNECTION LOGIC
  socket.on('join room', (data) => {
    console.log('Player joined room', data);

    socket.emit('join ok', {
      ...data,
      roomId: 1,
    });
  });

  //SET USERNAME
  socket.on('setUsername', (name) => {
    playerIndex = players.findIndex((p) => p.id == socket.id);

    players[playerIndex].name = name;

    socket.emit('player', players[playerIndex]);
  });

  //SET AVATAR
  socket.on('setAvatar', (avatar) => {
    playerIndex = players.findIndex((p) => p.id == socket.id);

    players[playerIndex].avatar = avatar;

    socket.emit('player', players[playerIndex]);
    console.log(players);
  });

  //GUESS AVATAR
  socket.on('guessAvatar', (id) => {
    let nrOfPlayers = Object.values(players).length;
    let playerNr = players.findIndex((p) => p.id == socket.id);

    if (playerNr + 1 < nrOfPlayers) {
      if (players[playerNr + 1].avatar == id) {
        io.emit('guessedAvatar', { id: socket.id, correct: true });
      } else {
        io.emit('guessedAvatar', { id: socket.id, correct: false });
      }
    } else {
      if (players[0].avatar == id) {
        io.emit('guessedAvatar', { id: socket.id, correct: true });
      } else {
        io.emit('guessedAvatar', { id: socket.id, correct: false });
      }
    }
  });

  io.on('connection', (socket) => {
    socket.join('1');
  });

  console.log(players);

  socket.on('disconnect', function () {
    console.log('A player disconnected');
    players = players.filter((p) => {
      return p.id != socket.id;
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
    let playerNr = players.findIndex((p) => p.id == player);

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
