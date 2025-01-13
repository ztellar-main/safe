import { MdKeyboardArrowRight } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io";

const Header = () => {
  return (
    <header className="absolute top-0 w-full z-40">
      {/* header container */}
      <div className="p-1 flex items-center justify-between">
        {/* return button */}
        <button className="btn">
          <span className="rotate-180 scale-150">
            <MdKeyboardArrowRight className="text-white" />
          </span>
        </button>
        {/* end to end encrypted text */}
        <p className="flex items-center">
          <FaLock className="text-white scale-75" />
          <span className="text-xs text-white">End-to-end encrypted</span>
        </p>
        {/* add contact to call */}
        <button className="btn">
          <IoMdPersonAdd className="text-white scale-100" />
        </button>
      </div>
    </header>
  );
};

export default Header;
