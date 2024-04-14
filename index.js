const express = require("express");
const { createServer } = require("node:http");
const { Server } = require("socket.io");

const path = require("path");
const cors = require("cors");
const { users } = require("./users");

const app = express();
const server = createServer(app);
const new_users = [{}];
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection",(socket)=>{
  console.log("New Connection");

  socket.on('joined',({user})=>{
        new_users[socket.id]=user;
        console.log(`${user} has joined `);
        socket.broadcast.emit('userJoined',{user:"Admin",message:` ${new_users[socket.id]} has joined`});
        socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${new_users[socket.id]} `})
  })

  socket.on('message',({message,id})=>{
      io.emit('sendMessage',{user:new_users[id],message,id});
  })

  socket.on('disconnect',()=>{
        socket.broadcast.emit('leave',{user:"Admin",message:`${new_users[socket.id]}  has left`});
      console.log(`user left`);
  })
});
app.get("/", (req, res) => {
  res.json(users);
});

server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
