import { createContext, useMemo, useContext } from "react";
import io from "socket.io-client";
import { server } from "./constants/config";

const SocketContext = createContext();

const getSocket = () => useContext(SocketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(() => io(server, { withCredentials: true }), []);

  socket.on("connect", () => {
    console.log(`Socket connected successfully`);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected successfully`);
  });

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, getSocket };
