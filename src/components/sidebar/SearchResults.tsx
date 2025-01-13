import Contact from "./Contact";

type Props = {
  searchResults: any;
  setSearchResults: any;
};

const SearchResults = ({ searchResults, setSearchResults }: Props) => {
  return (
    <div className="w-full convos scrollbar">
      {/* heading */}
      <div className="flex flex-col px-8 pt-8">
        <h1 className="font-extralight text-md text-green_2">Contacts</h1>
        <span className="w-full mt-4 ml-10 border-b dark:border-b-dark_border_1"></span>
      </div>
      {/* results */}
      <ul>
        {searchResults &&
          searchResults.map((user: any, i: any) => {
            return (
              <Contact
                contact={user}
                key={i}
                setSearchResults={setSearchResults}
              />
            );
          })}
      </ul>
    </div>
  );
};

export default SearchResults;
