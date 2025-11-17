import { io } from "socket.io-client";

const socket = io.connect(, {
  withCredentials: true,
  autoConnect: false
});

export default socket;
