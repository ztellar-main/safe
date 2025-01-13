import { Socket } from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { openCreateConversation } from "../../features/chatSlice";
import { getConversationId } from "../../utils/chat.util";
import { dateHandler } from "../../utils/date.util";
import SocketContexts from "../../context/SocketContexts";

import { BeatLoader } from "react-spinners";

type Props = {
  convo: any;
  socket: Socket;
  online: any;
  typing: any;
};

const Conversation = ({ convo, socket, online, typing }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: any) => state?.user);
  const { activeConversation } = useAppSelector((state: any) => state?.chat);

  const openConversation = async () => {
    const receiverId = getConversationId(user?.id, convo?.users);
    const values = {
      receiverId,
      token: user?.token,
    };

    const newConvo = await dispatch(openCreateConversation(values));
    socket.emit("join conversation", newConvo?.payload?._id);
  };

  const getUserNameSender = () => {
    const res = convo?.users?.filter((c: any) => c?._id !== user?.id)[0];
    return res;
  };

  return (
    <li
      onClick={openConversation}
      className={`list-none h-[72px] w-full   cursor-pointer dark:text-dark_text_1 px-[10px] ${
        activeConversation?._id === convo?._id
          ? "dark:bg-dark_hover_1"
          : "hover:dark:bg-dark_bg_2"
      }`}
    >
      {/* container */}
      <div className="relative w-full flex items-center justify-between py-[10px] ">
        {/* left */}
        <div className="flex items-center gap-x-3">
          {/* conversation user picture */}
          <div
            className={`relative w-[50px] min-w-[50px] h-[50px] rounded-full overflow-hidden ${
              online ? "online" : ""
            }`}
          >
            <img
              src={getUserNameSender()?.picture}
              alt={getUserNameSender()?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* conversation message */}
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">
              {getUserNameSender()?.name}
            </h1>
            {/* conversation message */}
            <div className="">
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  {typing === convo?._id ? (
                    <BeatLoader color="#fff" size={5} />
                  ) : (
                    <p className="">
                      {convo?.latest_message?.message?.length > 25
                        ? `${convo?.latest_message?.message?.substring(
                            0,
                            25
                          )}...`
                        : convo?.latest_message?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {convo?.latest_message?.createdAt &&
              dateHandler(convo?.latest_message?.createdAt)}
          </span>
        </div>
      </div>
      {/* border */}
      <div className="ml-16 border-b border-b-dark_border_1"></div>
    </li>
  );
};

const ConversationWithSocket = (props: any) => (
  <SocketContexts.Consumer>
    {(socket: any) => <Conversation {...props} socket={socket} />}
  </SocketContexts.Consumer>
);

export default ConversationWithSocket;
