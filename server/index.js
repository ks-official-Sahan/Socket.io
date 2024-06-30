// Socket.io with Express

const express = require("express");
// const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const app = express();
// app.use(cors({ origin: "*" }));

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});

instrument(io, { auth: false });

app.get("/", (req, res) => {
  res.send("Hello");
});

// check socket connection
io.on("connection", (socket) => {
  console.log(`Socket connected with id: ${socket.id}`);

  // receive from client
  socket.on("send-message", (message, room) => {
    console.log(message);

    // send to client
    // io.emit("receive-message", message); // sends to all even to the sender of the message.

    if (room != "") {
      socket.to(room).emit("receive-message", message);
    } else {
      socket.broadcast.emit("receive-message", message); // sends to all others except sender of the message.
    }
  });

  socket.on("join-room", (room, callBackFunc) => {
    socket.join(room);
    callBackFunc(`Joined to Room ${to}`);
  });
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App is listening on port ${port}`));

// // socket.io

// const io = require("socket.io")(3000, {
//   cors: {
//     origin: "*",
//   },
// });

// // check connection
// io.on("connection", (socket) => {
//   console.log(socket.id);

//   // receive from client
//   socket.on("send-message", (message) => {
//     console.log(message);

//     // send to client
//     io.emit("receive-message", message);
//   });

// });

// // Regular Websockets

// const WebSocket = require('ws')
// const server = new WebSocket.Server({ port: '8080' })

// server.on('connection', socket => {

//   socket.on('message', message => {

//     socket.send(`Roger that! ${message}`);

//   });

// });
