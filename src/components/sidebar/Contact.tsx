import { useAppDispatch, useAppSelector } from "../../app/store";
import { openCreateConversation } from "../../features/chatSlice";
import SocketContexts from "../../context/SocketContexts";
import { Socket } from "socket.io-client";

type Props = {
  contact: any;
  setSearchResults: any;
  socket: Socket;
};

const Contact = ({ contact, setSearchResults, socket }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: any) => state?.user);

  const openConversation = async () => {
    const values = {
      receiverId: contact?._id,
      token: user?.token,
    };
    const newConvo = await dispatch(openCreateConversation(values));
    socket.emit("join conversation", newConvo?.payload?._id);
    setSearchResults([]);
  };
  return (
    <li
      onClick={openConversation}
      className="list-none h-[72px] hover:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]"
    >
      {/* container */}
      <div className="relative w-full flex items-center justify-between py-[10px] ">
        {/* left */}
        <div className="flex items-center gap-x-3">
          {/* conversation user picture */}
          <div className="relative w-[50px] min-w-[50px] h-[50px] rounded-full overflow-hidden">
            <img
              src={contact?.picture}
              alt={contact?.name}
              className="w-full h-full object-cover"
            />
          </div>
          {/* conversation message */}
          <div className="w-full flex flex-col">
            <h1 className="font-bold flex items-center gap-x-2">
              {contact?.name}
            </h1>
            {/* conversation message */}
            <div className="">
              <div className="flex items-center gap-x-1 dark:text-dark_text_2">
                <div className="flex-1 items-center gap-x-1 dark:text-dark_text_2">
                  <p className="">{contact?.latest_message?.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* right */}
        <div className="flex flex-col gap-y-4 items-end text-xs">
          <span className="dark:text-dark_text_2">
            {/* {dateHandler(contact?.latest_message?.createdAt)} */}
          </span>
        </div>
      </div>
      {/* border */}
      <div className="ml-16 border-b border-b-dark_border_1"></div>
    </li>
  );
};

const ContactWithSocket = (props: any) => (
  <SocketContexts.Consumer>
    {(socket: any) => <Contact {...props} socket={socket} />}
  </SocketContexts.Consumer>
);

export default ContactWithSocket;
