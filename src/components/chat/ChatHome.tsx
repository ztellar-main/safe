import { FaReact } from "react-icons/fa";
const ChatHome = () => {
  return (
    <div className="h-full w-full dark:bg-dark_bg_4 select-none border-l dark:border-l-dark_border_2 border-b-[6px] border-b-green_2">
      {/* container */}
      <div className="-mt-1.5 w-full h-full flex flex-col gap-y-8 items-center justify-center">
        <span className="">
          <FaReact className="w-[50px] h-[50px] text-green_2" />
        </span>
        {/* infos */}
        <div className="mt-1 text-center space-y-[12px]">
          <h1 className="text-[32px] dark:text-dark_text_4 font-extralight">
            Zchat
          </h1>
          <p className="text-sm dark:text-dark_text_3">
            Send and receive messages without keeping your phone online <br />
            Use Zchat on up to 4 linked devices and 1 phone at the time
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHome;
