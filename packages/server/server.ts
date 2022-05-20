import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

const port = process.env.PORT || 3005;
const server = http.createServer(express);

const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('A player connected');

  let playerId = socket.id;

  let players: any = [];
  let current_turn = 0;
  let timeOut: any;
  let _turn = 0;

  function next_turn() {
    _turn = current_turn++ % players.length;
    players[_turn].emit('your_turn');
    console.log('next turn triggered ', _turn);
  }

  function resetTimeOut() {
    if (typeof timeOut === 'object') {
      console.log('timeout reset');
      clearTimeout(timeOut);
    }
  }

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

  socket.on('send message', (data) => {
    console.log(data);

    io.to('1').emit('received message', data);
  });

  socket.on('disconnect', function () {
    console.log('A player disconnected');
    players.splice(players.indexOf(socket), 1);
    _turn--;
    console.log('A number of players now ', players.length);
  });

  players.push(socket.id);

  let playerOne: string | null = players[0];
  let playerTwo: string | null = players[1];

  // if (playerOne === null) {
  //   playerOne = playerId;
  // } else {
  //   playerTwo = playerId;
  // }

  socket.on('pass_turn', function () {
    console.log({ playerOne, playerTwo, _turn });
    if (players[_turn] == socket) {
      next_turn();
    }

    socket.to('1').emit('next_turn', {
      player: _turn % 2 == 0 ? playerOne : playerTwo,
    });
  });
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
