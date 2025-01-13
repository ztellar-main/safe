import "../components/init";
import { useEffect, useRef, useState } from "react";
import { Sidebar } from "../components/sidebar";
import { useAppDispatch, useAppSelector } from "../app/store";
import { getConversations, updateMessages } from "../features/chatSlice";
import ChatHome from "../components/chat/ChatHome";
import ChatContainer from "../components/chat/ChatContainer";
import SocketContexts from "../context/SocketContexts";
import { Socket } from "socket.io-client";
import Call from "../components/chat/call/Call";
import { getConversationId } from "../utils/chat.util";
import Peer from "simple-peer";

type Props = {
  socket: Socket;
};

const callData = {
  receivingCall: false,
  callEnded: true,
  socketId: "",
  name: "",
  picture: "",
  signal: "",
};

const Home = ({ socket }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((e: any) => e?.user);
  const { activeConversation } = useAppSelector((e: any) => e?.chat);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typing, setTyping] = useState(false);

  // CALL
  const [call, setCall] = useState(callData);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const { receivingCall, callEnded, socketId } = call;
  const [callAccpted, setCallAccepted] = useState(false);
  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);
  const connectionRef = useRef<Peer>();
  const [show, setShow] = useState(false);
  console.log({ receivingCall, callEnded, show, socketId });

  // enable media
  const enableMedia = () => {
    if (myVideo?.current) {
      myVideo.current.srcObject = stream;
    }
    setShow(true);
  };

  // call useEffect
  useEffect(() => {
    setupMedia();
    socket.on("setup socket", (socketId) => {
      setCall({ ...call, socketId });
    });
    socket.on("call user", (data: any) => {
      setCall({
        ...call,
        socketId: data?.from,
        name: data?.name,
        picture: data?.picture,
        signal: data.signal,
        receivingCall: true,
      });
    });
    socket.on("end call", (message: any) => {
      console.log({ message, asd: "asdasdasd" });
      setShow(false);
      setCall({ ...call, callEnded: true, receivingCall: false });
      if (myVideo.current) {
        myVideo.current.srcObject = null;
      }
      if (userVideo.current) {
        userVideo.current.srcObject = null;
      }
      // connectionRef.current?.destroy();
    });
  }, []);
  // setup media function
  const setupMedia = () => {
    navigator?.mediaDevices
      ?.getUserMedia({ video: true, audio: true })
      .then((stream: any) => {
        setStream(stream);
      });
  };

  // call user function
  const callUser = async () => {
    if (call?.socketId) {
      console.log({ "from call": "no socket id" });
    }
    enableMedia();
    setCall({
      ...call,
      name: getConversationId(user?.id, activeConversation?.users)?.name,
      picture: getConversationId(user?.id, activeConversation?.users)?.picture,
      callEnded: false,
    });

    if (!stream) return;

    const peer = new Peer({ initiator: true, trickle: false, stream: stream });

    peer.on("signal", (data: any) => {
      socket.emit("call user", {
        userToCall: getConversationId(user?.id, activeConversation?.users)?._id,
        signal: data,
        from: call?.socketId,
        name: user?.name,
        picture: user?.picture,
      });
    });

    peer.on("stream", (stream: any) => {
      console.log(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });
    socket.on("call accept", (signal: any) => {
      setCallAccepted(true);
      peer.signal(signal);
    });
    if (connectionRef.current) {
      connectionRef.current = peer;
    }
  };

  // answer call function
  const answerCall = () => {
    enableMedia();
    setCallAccepted(true);
    if (!stream) return;
    const peer = new Peer({ initiator: false, trickle: false, stream: stream });

    peer.on("signal", (data: any) => {
      socket.emit("answer call", {
        signal: data,
        to: call?.socketId,
      });
    });
    peer.on("stream", (stream: any) => {
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    });

    peer.signal(call.signal);
    connectionRef.current = peer;
  };

  // end call function
  const endCall = () => {
    if (!call?.socketId) {
      console.log({ error: "NO SOCKET ID", socketId: call?.socketId });
      return;
    }
    console.log({ socketId: call?.socketId });
    socket.emit("end call", call?.socketId);
    if (myVideo.current) {
      myVideo.current.srcObject = null;
    }
    if (userVideo.current) {
      userVideo.current.srcObject = null;
    }
    setShow(false);
    // setCall({ ...call, callEnded: true, receivingCall: false });
    connectionRef.current?.destroy();
  };

  // join user into the socket io
  useEffect(() => {
    socket.emit("join", user.id);
    // get online users
    socket.on("get-online-users", (users: any) => {
      setOnlineUsers(users);
    });
  }, [user]);

  // get conversations
  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token));
    }
  }, [user]);

  // listening to receive messages
  useEffect(() => {
    const func = () => {
      socket.on("receive message", (message: any) => {
        dispatch(
          updateMessages({
            message,
            conversation: message?.conversation,
          })
        );
      });
    };
    func();
  }, [socket]);

  // typing
  useEffect(() => {
    const func = () => {
      socket.on("typing", (conversation) => {
        console.log(conversation);
        setTyping(conversation);
      });
      socket.on("stop typing", () => setTyping(false));
    };
    func();
  }, []);

  return (
    <>
      <div className="h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hidden">
        {/* container */}
        <div className="container h-screen flex py-4">
          {/* sidebar */}
          <Sidebar onlineUsers={onlineUsers} typing={typing} />
          {activeConversation?._id ? (
            <ChatContainer
              typing={typing}
              onlineUsers={onlineUsers}
              callUser={callUser}
            />
          ) : (
            <ChatHome />
          )}
        </div>
      </div>
      <Call
        call={call}
        setCall={setCall}
        callAccpted={callAccpted}
        userVideo={userVideo}
        myVideo={myVideo}
        stream={stream}
        setCallAccepted={setCallAccepted}
        answerCall={answerCall}
        show={show}
        endCall={endCall}
      />
    </>
  );
};

const HomeWithSocket = () => (
  <SocketContexts.Consumer>
    {(socket: any) => <Home socket={socket} />}
  </SocketContexts.Consumer>
);

export default HomeWithSocket;
