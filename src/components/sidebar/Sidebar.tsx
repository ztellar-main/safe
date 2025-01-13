import { useState } from "react";
import Notifications from "./Notifications";
import SidebarHeader from "./SidebarHeader";
import Search from "./Search";
import Conversations from "./Conversations";
import SearchResults from "./SearchResults";

type Props = {
  onlineUsers: any;
  typing: any;
};

const Sidebar = ({ onlineUsers, typing }: Props) => {
  const [searchResults, setSearchResults] = useState([]);
  return (
    <div className="flex0030 max-w-[30%] h-full select-none ">
      {/* sidebar header */}
      <SidebarHeader />
      {/* notifications */}
      <Notifications />
      {/* search */}
      <Search
        searchResults={searchResults}
        setSearchResults={setSearchResults}
      />
      {/* conversations */}
      {searchResults.length > 0 ? (
        <SearchResults
          searchResults={searchResults}
          setSearchResults={setSearchResults}
        />
      ) : (
        <Conversations onlineUsers={onlineUsers} typing={typing} />
      )}
    </div>
  );
};

export default Sidebar;
