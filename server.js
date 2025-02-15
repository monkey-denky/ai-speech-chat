const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 6969 });

server.on('connection', (socket) => {
  console.log('A new client connected');
  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Respond with a formatted message
    socket.send(`Thank you for your message: ${message}`);
  });
});

console.log('WebSocket server is running on ws://localhost:6969'); 