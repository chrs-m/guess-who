import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const port = process.env.PORT || 3001;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Listening on ${port}`);
});
