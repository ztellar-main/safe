import { BiPoll } from "react-icons/bi";
import { IoIosContact } from "react-icons/io";
import { IoIosDocument } from "react-icons/io";
import { IoIosCamera } from "react-icons/io";
import { PiStickerFill } from "react-icons/pi";
import { MdPhoto } from "react-icons/md";


const Menu = () => {

  const handlerOpen = () => {};
  return (
    <ul
      onClick={handlerOpen}
      className="absolute bottom-14 left-2 openEmojiAnimation"
    >
      {/* POLL */}
      <li className="">
        <button
          type="button"
          className="rounded-full p-1 bg-green_1 overflow-hidden"
        >
          <BiPoll className="bg-green_1 text-white w-[20px] h-[20px] rotate-[-90deg]" />
        </button>
      </li>
      {/* contact */}
      <li className="">
        <button
          type="button"
          className="rounded-full p-1 bg-[#0EABF4] overflow-hidden"
        >
          <IoIosContact className="bg-[#0EABF4] text-white w-[20px] h-[20px] " />
        </button>
      </li>
      {/* document */}
      <li className="">
        <button
          type="button"
          className="rounded-full p-1 bg-[#5F66CD] overflow-hidden"
        >
          <IoIosDocument className="bg-[#5F66CD] text-white w-[20px] h-[20px]" />
        </button>
      </li>
      {/* camera */}
      <li className="">
        <button
          type="button"
          className="rounded-full p-1 bg-[#D3396D] overflow-hidden"
        >
          <IoIosCamera className="bg-[#D3396D] text-white w-[20px] h-[20px]" />
        </button>
      </li>
      {/* sticker */}
      <li className="">
        <button
          type="button"
          className="rounded-full p-1 bg-blue-600 overflow-hidden"
        >
          <PiStickerFill className="bg-blue-600 text-white w-[20px] h-[20px] rotate-[-90deg]" />
        </button>
      </li>
      {/* photo */}
      <li className="">
        <button
          type="button"
          className="rounded-full p-1 bg-[#BF59CF] overflow-hidden"
        >
          <MdPhoto className="bg-[#BF59CF] text-white w-[20px] h-[20px] rotate-[-90deg]" />
        </button>
      </li>
    </ul>
  );
};

export default Menu;
