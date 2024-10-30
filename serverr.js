import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const server = createServer(app);
const io = new Server(server);
const allusers = {}; // Object to track all connected users

// Get the directory name of the current module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Expose the public directory to the outside world
app.use(express.static(join(__dirname, 'public')));

// Serve index.html on root GET request
app.get("/", (req, res) => {
  console.log("GET Request /");
  res.sendFile(join(__dirname, 'app/index.html')); // Serve your HTML file
});

// Handle socket connections
io.on("connection", (socket) => {
  console.log(`Someone connected to the socket server and socket id is ${socket.id}`);

  // Handle user joining
  socket.on("join-user", username => {
    console.log(`${username} joined the socket connection`);
    allusers[username] = { username, id: socket.id };
    // Inform everyone that someone joined
    io.emit("joined", allusers);
  });

  // Handle WebRTC offer
  socket.on("offer", ({ from, to, offer }) => {
    console.log({ from, to, offer });
    io.to(allusers[to].id).emit("offer", { from, to, offer });
  });

  // Handle WebRTC answer
  socket.on("answer", ({ from, to, answer }) => {
    io.to(allusers[from].id).emit("answer", { from, to, answer });
  });

  // Handle call ended
  socket.on("end-call", ({ from, to }) => {
    io.to(allusers[to].id).emit("end-call", { from, to });
  });

  // Broadcast ICE candidate to other peers
  socket.on("icecandidate", candidate => {
    console.log({ candidate });
    socket.broadcast.emit("icecandidate", candidate);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected`);
    // Remove the user from the list
    for (const user in allusers) {
      if (allusers[user].id === socket.id) {
        delete allusers[user];
        break;
      }
    }
    io.emit("joined", allusers);
  });
});

// Start the server and listen on port 9000
server.listen(9000, () => {
  console.log("Server listening on port 9000");
});
