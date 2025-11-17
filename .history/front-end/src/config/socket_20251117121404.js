import { io } from "socket.io-client";

const socket = io.connect("htt, {
  withCredentials: true,
  autoConnect: false
});

export default socket;
