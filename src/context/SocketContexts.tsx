import { createContext } from "react";
import { Socket } from "socket.io-client";

type SocketContextType = Socket | null;

const SocketContexts = createContext<SocketContextType>(null);

export default SocketContexts;
