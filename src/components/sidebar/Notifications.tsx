import { IoIosNotifications } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdKeyboardArrowRight } from "react-icons/md";

const Notifications = () => {
  return (
    <div className="h-[90px] dark:bg-dark_bg_3 flex items-center p-[13px]">
      {/* container */}
      <div className="w-full flex items-center justify-between">
        {/* left */}
        <div className="flex items-center gap-x-4">
          <IoIosNotifications className="dark:text-blue_1 cursor-pointer w-[30px] h-[30px]" />
          <div className="flex flex-col">
            <span className="textPrimary">Get notified of new messages</span>
            <span className="textSecondary mt-0.5 flex items-center gap-0.5">
              Turn on desktop notifications
              <MdKeyboardArrowRight className="dark:text-dark_svg_2 mt-1" />
            </span>
          </div>
        </div>
        {/* right */}
        <div className="cursor-pointer">
          <IoClose className="dark:text-dark_svg_2" />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
