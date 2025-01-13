import { Socket } from "socket.io-client";
import LoginForm from "../components/auth/LoginForm";
import SocketContexts from "../context/SocketContexts";

type Props = {
  socket: Socket;
};

const Login = ({ socket }: Props) => {
  console.log(socket);
  return (
    <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
      {/* Container */}
      <div className="flex w-[1600px] mx-auto h-full">
        {/* Login form */}
        <LoginForm />
      </div>
    </div>
  );
};

const LoginWithSocket = () => (
  <SocketContexts.Consumer>
    {(socket: any) => <Login socket={socket} />}
  </SocketContexts.Consumer>
);

export default LoginWithSocket;
