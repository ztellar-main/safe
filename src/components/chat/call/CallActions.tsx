import { MdKeyboardArrowRight } from "react-icons/md";
import { PiSpeakerSimpleHighFill } from "react-icons/pi";
import { MdVideocam } from "react-icons/md";
import { IoMdCall } from "react-icons/io";

// mute
import { PiSpeakerSimpleSlashFill } from "react-icons/pi";
// disable video
// import { MdVideocamOff } from "react-icons/md";

type Props = {
  endCall: any;
};

const CallActions = ({ endCall }: Props) => {
  return (
    <div className="h-22 w-full absolute bottom-0 z-40 px-1">
      {/* container */}
      <div className="relative bg-[#222] px-4 pt-6 pb-12 rounded-xl">
        {/* Expand icon */}
        <button className="-rotate-90 scale-y-[300%] absolute top-1 left-1/2 translate-x-[-50%]">
          <MdKeyboardArrowRight className="text-dark_svg_2" />
        </button>
        {/* actions */}
        <ul className="flex items-center justify-between">
          <li className="">
            <button className="btn_secondary">
              <PiSpeakerSimpleHighFill className="text-white w-6 h-6" />
            </button>
          </li>
          <li className="">
            <button className="btn_secondary">
              <MdVideocam className="text-white w-8 h-8" />
            </button>
          </li>
          <li className="">
            <button className="btn_secondary">
              <PiSpeakerSimpleSlashFill className="text-white w-6 h-6" />
            </button>
          </li>
          <li onClick={endCall} className="">
            <button className="btn_secondary bg-red-600 rotate-[135deg]">
              <IoMdCall className="text-white w-7 h-7" />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CallActions;
