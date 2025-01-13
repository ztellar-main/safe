import { useAppDispatch } from "../../app/store";
import { logout } from "../../features/userSlice";

const Menu = () => {
  const dispatch = useAppDispatch();
  return (
    <div className="absolute right-1 z-50 dark:bg-dark_bg_2 dark:text-dark_text_1 shadow-md w-52">
      <ul>
        <li className="py-3 pl-5 cursor-pointer hover:dark:bg-dark_bg_3">
          <span className="">New Group</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:dark:bg-dark_bg_3">
          <span className="">New Community</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:dark:bg-dark_bg_3">
          <span className="">Starred Messages</span>
        </li>
        <li className="py-3 pl-5 cursor-pointer hover:dark:bg-dark_bg_3">
          <span className="">Settings</span>
        </li>
        <li
          onClick={() => dispatch(logout())}
          className="py-3 pl-5 cursor-pointer hover:dark:bg-dark_bg_3"
        >
          <span className="">Logout</span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
