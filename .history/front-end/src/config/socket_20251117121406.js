import { io } from "socket.io-client";

const socket = io.connect(pr, {
  withCredentials: true,
  autoConnect: false
});

export default socket;
