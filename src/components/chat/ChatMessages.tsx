import { useEffect, useRef } from "react";
import { useAppSelector } from "../../app/store";
import Message from "./Message";
import Typing from "./Typing";

type Props = {
  typing: any;
};

const ChatMessages = ({ typing }: Props) => {
  const { messages } = useAppSelector((e: any) => e?.chat);
  const { user } = useAppSelector((e: any) => e?.user);
  const endRef = useRef<HTMLDivElement | null>(null);
  const { activeConversation } = useAppSelector((e: any) => e?.chat);

  useEffect(() => {
    const func = () => {
      endRef?.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    };
    func();
  }, [messages, typing]);
  return (
    <div className="mb-[60px] bg-[url('')] bg-cover bg-no-repeat">
      {/* container */}
      <div className="scrollbar overflow_scrollbar overflow-auto py-2 px-[5%]">
        {/* messages */}
        {messages &&
          messages?.map((message: any, i: any) => {
            return (
              <Message
                key={i}
                message={message}
                me={user.id === message?.sender?._id}
              />
            );
          })}
        {typing === activeConversation?._id && <Typing />}

        <div ref={endRef} />
      </div>
    </div>
  );
};

export default ChatMessages;
