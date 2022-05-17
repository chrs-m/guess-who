import { io, Socket } from 'socket.io-client';

const server = io('http://localhost:3005');

export default server;
