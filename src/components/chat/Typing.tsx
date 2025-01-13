import { IoTriangle } from "react-icons/io5";
import { BeatLoader } from "react-spinners";

const Typing = () => {
  return (
    <div className={`w-full flex m-2 space-x-3 max-w-xs`}>
      {/* message container */}
      <div className="">
        <div
          className={`relative h-full dark:text-dark_text_1 p-2 rounded lg dark:bg-dark_bg_2`}
        >
          {/* message */}
          <p className="float-left h-full text-sm p-1">
            <BeatLoader color="#fff" size={10} />
          </p>

          {/* triangle */}

          <IoTriangle className="dark:text-dark_bg_2 rotate-[60deg] absolute top-[-5px] -left-1.5" />
        </div>
      </div>
    </div>
  );
};

export default Typing;
