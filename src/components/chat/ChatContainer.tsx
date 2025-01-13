import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import { getConversationMessages } from "../../features/chatSlice";
import ChatActions from "./ChatActions";

type Props = {
  onlineUsers: any;
  typing: any;
  callUser: any;
};

const ChatContainer = ({ onlineUsers, typing, callUser }: Props) => {
  const { activeConversation } = useAppSelector((e: any) => e?.chat);
  const { user } = useAppSelector((e: any) => e?.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!activeConversation?._id) {
      return;
    }
    const values = {
      token: user?.token,
      conversationId: activeConversation?._id,
    };

    dispatch(getConversationMessages(values));
  }, [activeConversation]);
  return (
    <div className="relative h-full w-full select-none border-l dark:border-l-dark_border_2 overflow-hidden">
      {/* container */}
      <div className="">
        {/* chat header */}
        <ChatHeader onlineUsers={onlineUsers} callUser={callUser} />
        {/* chat messages */}
        <ChatMessages typing={typing} />
        {/* chat actions */}
        <ChatActions />
      </div>
    </div>
  );
};

export default ChatContainer;
