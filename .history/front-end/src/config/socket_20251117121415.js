import { io } from "socket.io-client";

const socket = io.connect(import.meta.en, {
  withCredentials: true,
  autoConnect: false
});

export default socket;
