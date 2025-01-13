import { useState } from "react";
import { GoArrowLeft } from "react-icons/go";
import { CiSearch } from "react-icons/ci";
import { IoFilterOutline } from "react-icons/io5";
import axios, { AxiosError } from "axios";
import { useAppSelector } from "../../app/store";

type Props = {
  searchResults: any;
  setSearchResults: any;
};

const Search = ({ searchResults, setSearchResults }: Props) => {
  const { user } = useAppSelector((state: any) => state?.user);
  const [show, setShow] = useState(false);

  const handleSearch = async (e: any) => {
    const value = e.target.value;
    if (Number(value.length) < 1) {
      return;
    }
    if (e.key === "Enter") {
      try {
        const res = await axios({
          method: "get",
          url: `${import.meta.env.VITE_BASE_URL_API}/user?search=${value}`,
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });
        setSearchResults(res?.data);
        return res?.data;
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err?.response?.data?.error?.message);
        }
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <div className="h-[49px] py-1.5">
      {/* container */}
      <div className="px-[10px]">
        {/* search input container */}
        <div className="flex items-center gap-x-2">
          <div className="w-full flex dark:bg-dark_bg_2 rounded-lg pl-2">
            {show || searchResults > 0 ? (
              <span
                onClick={() => setSearchResults([])}
                className="w-8 flex items-center justify-center rotateAnimation cursor-pointer"
              >
                <GoArrowLeft className="text-green_1 w-5 h-5" />
              </span>
            ) : (
              <span className="w-8 flex items-center justify-center">
                <CiSearch className="dark:text-dark_svg_2 w-5 h-5" />
              </span>
            )}
            <input
              type="text"
              placeholder="Search or start a new chat"
              className="input"
              onFocus={() => setShow(true)}
              onBlur={() => {
                if (searchResults?.length === 0) {
                  setShow(false);
                }
              }}
              onKeyDown={(e: any) => {
                handleSearch(e);
              }}
            />
          </div>
          <button className="btn">
            <IoFilterOutline className="dark:text-dark_svg_2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
