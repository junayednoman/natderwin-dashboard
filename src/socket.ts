import { io, Socket } from "socket.io-client";

// Utility function to initialize the socket connection
const getSocket = (token: string): Socket | null => {
  if (!token) {
    console.error("Token is required for socket connection.");
    return null;
  }

  try {
    // Create socket connection
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: {
        token: `Bearer ${token}`, // Pass token in the "Bearer" format
      },
      transports: ["websocket"],
      reconnection: true,
      // reconnect: true,  // Automatically reconnect when disconnected
      reconnectionAttempts: 3,  // Number of reconnection attempts before giving up
      reconnectionDelay: 1000,  // Delay between reconnection attempts (in ms)
      reconnectionDelayMax: 5000,
    });

    // Handle successful connection
    socket.on("connection", () => {
      console.log('Socket connected');
    });

    // // Handle disconnection
    socket.on("disconnect", () => {
      console.log('Socket disconnected');
    });

    return socket; // Return the socket instance

  } catch (error) {
    console.error("Error while establishing socket connection:", error);
    return null; // Return null if socket creation failed
  }
};

export default getSocket;
