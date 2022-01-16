import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors({
  origin: ["*"],
}));


// socket
import { createServer } from "http"
import { Server } from "socket.io";
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://steven-tower:3000",
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log("New Connection..." + socket.id);
  socket.emit("greeting", "Welcome")
  io.emit("greeting", "look who showed up, everyone!")
  socket.broadcast.emit("greeting", "pretend you like them")

  socket.on("userJoin", (room) => {
    socket.join(room)
  });

  //send a message to everyone but the original sender
  socket.on("message", (data) => {
    //broadcast from the original sender socket
    socket.broadcast.emit("serverMessage", data, socket.id);

  });

  socket.on("usermessage", (room, data) => {
    socket.leave("public")
    socket.join(room);
    console.log(data);
    socket.to(room).emit("serverMessage", data, socket.id); 
    io.to(socket.id).emit("PM", `message sent: ${data}`) //this is how you PM 
  })

  

  // Here is where we handle the disconnect of a socket.
  socket.on("disconnect", (userList) => {
    console.log("user disconnected");
    //io.emit("userLeft", `${socket.id} disconnected`);
  });

  
});

mongoose.connect('mongodb://mongodb:27017/socket')
  .then(() => httpServer.listen(5000, () => console.log('server up - port 5000')))
  .catch((err) => console.log(err.message));

