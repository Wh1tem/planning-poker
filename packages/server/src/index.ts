import { server as WebSocketServer } from 'websocket';
import http from 'http';

const webSocketServerPort = 8000;

const server = http.createServer();
server.listen(webSocketServerPort);
console.log('listening on port 8000');

const wsServer = new WebSocketServer({
  httpServer: server,
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const clients: any = {};

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * Math.floor(max));
}

wsServer.on('request', request => {
  const userId = getRandomInt(2000);
  console.log(`${new Date()} Recieved a new connection from origin ${request.origin}.`);

  const connection = request.accept(undefined, request.origin);
  clients[userId] = connection;
  console.log(`${userId} is connected in ${Object.getOwnPropertyNames(clients)}`);

  connection.on('message', message => {
    if (message.type === 'utf8') {
      console.log(`Received message: ${message.utf8Data}`);

      // Broadcast all messages to connected clients
      Object.keys(clients).forEach(key => {
        clients[key].sendUTF(message.utf8Data);
        console.log(`send message to: ${clients[key]}`);
      });
    }
  });
});
