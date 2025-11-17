import { io } from "socket.io-client";

const socket = io.connect(import., {
  withCredentials: true,
  autoConnect: false
});

export default socket;
