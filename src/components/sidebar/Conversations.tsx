import { useAppSelector } from "../../app/store";
import { getConversationId } from "../../utils/chat.util";
import Conversation from "./Conversation";

type Props = {
  onlineUsers: any;
  typing: any;
};

const Conversations = ({ onlineUsers, typing }: Props) => {
  const { conversations, activeConversation } = useAppSelector(
    (state: any) => state?.chat
  );
  const { user } = useAppSelector((state: any) => state?.user);

  return (
    <div className="convos scrollbar">
      <ul className="">
        {conversations &&
          conversations
            .filter(
              (c: any) =>
                c?.latest_message || c?._id === activeConversation?._id
            )
            .map((convo: any, i: any) => {
              let check = onlineUsers.find((u: any) => {
                return (
                  u?.userId === getConversationId(user?.id, convo?.users)?._id
                );
              });

              return <Conversation convo={convo} key={i} online={check} typing={typing} />;
            })}
      </ul>
    </div>
  );
};

export default Conversations;
