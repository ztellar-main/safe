import Attachments from "./Attachments";
import EmojiPicker from "./EmojiPickerApp";
import { IoSend } from "react-icons/io5";
import Input from "./Input";
import { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { sendMessage } from "../../features/chatSlice";
import { ClipLoader } from "react-spinners";
import SocketContexts from "../../context/SocketContexts";
import { Socket } from "socket.io-client";

type Props = {
  socket: Socket;
};

const ChatActions = ({ socket }: Props) => {
  const [message, setMessage] = useState("");
  const dispatch = useAppDispatch();
  const { activeConversation, status } = useAppSelector((e: any) => e?.chat);
  const { user } = useAppSelector((e: any) => e?.user);
  const textRef = useRef<HTMLInputElement>(null);
  const [showAttachment, setShowAttachment] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);

  const values = {
    message,
    convoId: activeConversation?._id,
    token: user?.token,
    files: [],
  };

  const sendMessageHandler = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const newMessage = await dispatch(sendMessage(values));
    console.log(newMessage);
    socket.emit("send message", newMessage?.payload);
    setLoading(false);
    setMessage("");
  };

  // unfocus
  // const unfocusFunction = () => {
  //   if (textRef.current) {
  //     textRef.current.blur(); // Unfocus the input
  //   }
  // };
  return (
    <form
      onSubmit={(e: any) => sendMessageHandler(e)}
      className="dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 px-4 py-2 select-none"
    >
      {/* container */}
      <div className="w-full flex items-center gap-x-2">
        {/* emojis and attachments */}
        <ul className="flex gap-x-2">
          <EmojiPicker
            textRef={textRef}
            setMessage={setMessage}
            showEmojis={showEmojis}
            setShowEmojis={setShowEmojis}
            setShowAttachment={setShowAttachment}
          />
          <Attachments
            showAttachment={showAttachment}
            setShowAttachment={setShowAttachment}
            setShowEmojis={setShowEmojis}
          />
        </ul>
        {/* input */}
        <Input textRef={textRef} message={message} setMessage={setMessage} />
        {/* send button */}
        {/* onClick={unfocusFunction} */}
        <button type="submit" className="btn">
          {status === "loading" && loading ? (
            <ClipLoader color="#E9EDEF" size={25} />
          ) : (
            <IoSend className="dark:text-dark_svg_2" />
          )}
        </button>
      </div>
    </form>
  );
};

const ChatActionsWithSocket = (props: any) => (
  <SocketContexts.Consumer>
    {(socket: any) => <ChatActions {...props} socket={socket} />}
  </SocketContexts.Consumer>
);

export default ChatActionsWithSocket;
