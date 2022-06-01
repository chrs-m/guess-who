import { io, Socket } from 'socket.io-client';

const server = io('https://tranquil-badlands-99002.herokuapp.com/');

export default server;
