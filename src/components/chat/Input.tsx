import { useState } from "react";
import SocketContexts from "../../context/SocketContexts";
import { Socket } from "socket.io-client";
import { useAppSelector } from "../../app/store";

type Props = {
  message: any;
  setMessage: any;
  textRef: any;
  socket: Socket;
};

const Input = ({ message, setMessage, textRef, socket }: Props) => {
  const [typing, setTyping] = useState(false);
  const { activeConversation } = useAppSelector((e: any) => e?.chat);
  const onChangeHandler = async (e: any) => {
    setMessage(e.target.value);
    if (!typing) {
      setTyping(true);
      socket.emit("typing", activeConversation?._id);
    }
    let lastTypingTime = new Date().getTime();
    let timer = 2000;
    setTimeout(() => {
      let timeNow = new Date().getTime();
      let timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timer && typing) {
        socket.emit("stop typing", activeConversation?._id);
        setTyping(false);
      }
    }, timer);

    // const checkFocus = () => {
    //   if (textRef.current === document.activeElement) {
    //     socket.emit("typing", activeConversation?._id);
    //   } else {
    //     socket.emit("stop typing", activeConversation?._id);
    //   }
    // };

    // // Attach listeners for focus and blur
    // window.addEventListener("focusin", checkFocus);
    // window.addEventListener("focusout", checkFocus);
  };

  return (
    <div className="w-full">
      <input
        ref={textRef}
        type="text"
        className=" dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full rounded-lg pl-4"
        placeholder="Type a message"
        value={message}
        onChange={onChangeHandler}
      />
    </div>
  );
};

const InputWithSocket = (props: any) => (
  <SocketContexts.Consumer>
    {(socket: any) => <Input {...props} socket={socket} />}
  </SocketContexts.Consumer>
);

export default InputWithSocket;
