import { useState } from "react";
import { useAppSelector } from "../../app/store";
import { BsFillPeopleFill } from "react-icons/bs";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import { FaRegCircle } from "react-icons/fa6";
import Menu from "./Menu";

const SidebarHeader = () => {
  const { user } = useAppSelector((e: any) => e.user);

  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="h-[50px] dark:bg-dark_bg_2 flex items-center px-16">
      {/* container */}
      <div className="w-full flex items-center justify-between">
        {/* user image */}
        <button className="btn">
          <img
            src={user?.picture}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
        </button>
        <p className="text-white">{user?.name}</p>
        {/* user icons */}
        <ul className="flex items-center gap-x-2 5">
          <li>
            <button className="btn">
              <BsFillPeopleFill className="dark:text-dark_svg_2" />
            </button>
          </li>
          <li>
            <button className="btn">
              <FaRegCircle className="dark:text-dark_svg_2" />
            </button>
          </li>
          <li>
            <button className="btn">
              <MdMessage className="dark:text-dark_svg_2" />
            </button>
          </li>
          <li className="relative" onClick={() => setShowMenu((e: any) => !e)}>
            <button className={`btn ${showMenu && "bg-dark_hover_1"}`}>
              <BsThreeDotsVertical className="dark:text-dark_svg_2" />
            </button>
            {showMenu && <Menu />}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SidebarHeader;
