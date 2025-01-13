import { useAppSelector } from "../../app/store";
import { CiSearch } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoCallOutline } from "react-icons/io5";
import { GoDeviceCameraVideo } from "react-icons/go";

type Props = {
  onlineUsers: any;
  callUser: any;
};

const ChatHeader = ({ onlineUsers, callUser }: Props) => {
  const { activeConversation } = useAppSelector((e: any) => e?.chat);
  const { users } = activeConversation;
  const { user } = useAppSelector((state: any) => state?.user);

  const getUserNameSender = () => {
    const res = users?.filter((c: any) => c?._id !== user?.id)[0];
    return res;
  };

  const headerUserName = (word: any) => {
    return word[0].toUpperCase() + word.substring(1).toLowerCase();
  };

  // if online
  const onlineFunction = () => {
    const filterOnline = onlineUsers.filter((u: any) => {
      return u?.userId === getUserNameSender()._id;
    });
    return filterOnline[0];
  };

  const videoFunc = () => {
    
  }

  return (
    <div className="h-[59px] dark:bg-dark_bg_2 flex items-center px-[16px] select-none">
      {/* container */}
      <div className="w-full flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-x-4">
          {/* conversation image */}
          <button className="btn">
            <img
              src={getUserNameSender()?.picture}
              alt={`${getUserNameSender()?.name} picture`}
              className="w-full h-full rounded-full object-cover"
            />
          </button>
          {/* conversation name and online status */}
          <div className="flex flex-col">
            <h1 className="dark:text-white text-md font-bold">
              {headerUserName(getUserNameSender()?.name)}
            </h1>
            <span className="text-xs dark:text-dark_text_2">
              {onlineFunction() ? "online" : "offline"}
            </span>
          </div>
        </div>
        {/* right */}

        <ul className="flex items-center gap-x-2.5">
          {onlineFunction() && (
            <li>
              <button onClick={videoFunc} className="btn">
                <GoDeviceCameraVideo
                  onClick={callUser}
                  className="dark:text-dark_svg_2"
                />
              </button>
            </li>
          )}
          {onlineFunction() && (
            <li>
              <button className="btn">
                <IoCallOutline className="dark:text-dark_svg_2" />
              </button>
            </li>
          )}

          <li>
            <button className="btn">
              <CiSearch className="dark:text-dark_svg_2" />
            </button>
          </li>
          <li>
            <button className="btn">
              <BsThreeDotsVertical className="dark:text-dark_svg_2" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ChatHeader;
