import { io } from "socket.io-client";

const socket = io.connect(import.meta.env.VITE_BASE_URL, {
  withCredentials: true,
  autoConnect: false
});

export default socket;
