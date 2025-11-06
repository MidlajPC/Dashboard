const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const dbconnect = require("./config/dbconfig");
require("dotenv").config();
const userRoutes = require("./routes/user.routes");
const botRoutes = require("./routes/getBots.routes");
const userModel = require("./model/user.model");
const bcrypt = require("bcrypt");
const { getbots } = require("./controller/bot.controller");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(cors({ origin: process.env.BASE_URL, credentials: true }));
// app.use(cors({ origin: "https://dashboard-henna-nu-36.vercel.app", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use(userRoutes);
app.use(botRoutes);

dbconnect();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL,
    credentials: true
  }
});

io.on("connection", (socket) => {
  console.log("user connected:", socket.id);

  socket.on("getBots", async ()=>);
});

server.listen(process.env.PORT, (err) => {
  console.log("server is running");
});

// app.listen(process.env.PORT, (err) => {
//   console.log("server is running");
// });
