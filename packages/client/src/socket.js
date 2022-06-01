import { io, Socket } from 'socket.io-client';

const server = io('https://vem-dar.herokuapp.com/');

export default server;
