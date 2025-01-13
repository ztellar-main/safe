import moment from "moment";
import { IoTriangle } from "react-icons/io5";

type Props = {
  message: any;
  me: any;
};

const Message = ({ message, me }: Props) => {
  return (
    <div
      className={`w-full flex m-2 space-x-3 max-w-xs ${
        me ? "ml-auto justify-end" : ""
      }`}
    >
      {/* message container */}
      <div className="">
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded lg ${
            me ? "dark:bg-green_3" : "dark:bg-dark_bg_2"
          }`}
        >
          {/* message */}
          <p className="float-left h-full text-sm pb-4 pr-8">
            {message?.message}
          </p>
          {/* date */}
          <span className="absolute right-1.5 bottom-1.5 text-xs pt-6 dark:text-dark_text_5">
            {moment(message?.createdAt).format("HH:mm")}
          </span>
          {/* triangle */}
          {!me && (
            <IoTriangle className="dark:text-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;
