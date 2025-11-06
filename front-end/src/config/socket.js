import { io } from "socket.io-client";

const socket = io.connect("http://localhost:5000", {
  withCredentials: true,
  autoConnect: true
});

export default socket;
