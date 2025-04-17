import { io } from "socket.io-client";

const getSocket = (token: string) => {
  const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    auth: {
      token: `Bearer ${token}`,
    },
  });
  return socket;
}
export default getSocket;