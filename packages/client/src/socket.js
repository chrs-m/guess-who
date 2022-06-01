import { io, Socket } from 'socket.io-client';

const server = io('https://guess-who-yrgo.herokuapp.com/');

export default server;
