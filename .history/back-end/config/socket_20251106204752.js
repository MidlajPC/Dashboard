const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const { default: socket } = require("../../front-end/src/config/socket");
require("dotenv").config();

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL,
    credentials: true
  }
});

io.on("connection",(socket)=>{
    console.log(socket.id)
    socket.on("send msg",(data)=>{
        clg
    })
})

server.listen(process.env.PORT,(err)=>{
  console.log("server is running")
});
// module.exports={server,io,app}
