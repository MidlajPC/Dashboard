const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors=require("co")

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true
  }
});

