import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import WebSocket from 'ws';

const port = process.env.PORT || 3005;
const server = http.createServer(express);

const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('join room', (data) => {
    console.log('Player joined room', data);

    //Join room

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
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
