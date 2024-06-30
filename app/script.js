// npm i socket.io-client
// import { io } from "socket.io-client";
// or use <script src="node_modules/socket.io-client/dist/socket.io.js"></script> in your html page

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  displayMessage(`You connected with id: ${socket.id}`);
});

socket.on("receive-message", (message) => {
  displayMessage(message);
});

function sendMessage() {
  const text = document.getElementById("msg").value;
  const to = document.getElementById("to").value;

  displayMessage(text);
  socket.emit("send-message", text, to);
}

function joinRoom() {
  const to = document.getElementById("to").value;

  socket.emit("join-room", to, (message) => {
    displayMessage(message);
  });
}

function displayMessage(message) {
  const el = document.createElement("li");
  el.innerHTML = message;
  document.querySelector("ul").appendChild(el);
}

// Regular Websockets

// const socket = new WebSocket('ws://localhost:8080');

// // Listen for messages
// socket.onmessage = ({ data }) => {
//     console.log('Message from server ', data);
// };

// document.querySelector('button').onclick = () => {
//     socket.send('hello');
// }
