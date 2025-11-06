import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5000", {
  withCredentials: true,
  autoConnect: false
});
io.emit("send msg",{mes})

export default socket;
