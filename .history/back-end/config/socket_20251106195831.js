const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
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

server.listen(process.);
