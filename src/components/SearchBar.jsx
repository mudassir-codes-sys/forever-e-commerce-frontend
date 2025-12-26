import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import search from "../assets/frontend_assets/search_icon.png";
import cross from "../assets/frontend_assets/cross_icon.png";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const { showSearch, setShowSearch, search, setSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();
  useEffect(() => {
    location.pathname.includes("collection")
      ? setVisible(true)
      : setVisible(false);
  }, [location]);
  return showSearch && visible ? (
    <div className=" border-t border-b bg-gray-50 text-center ">
      <div className="inline-flex  items-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2">
        <input
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          autoFocus
          className="flex 1 outline-none bg-inherit text-sm "
          type="text"
          placeholder="Search"
        />
        <img src={search} className="w-4" alt="" />
      </div>
      <img
        className="inline w-3 cursor-pointer"
        onClick={() => setShowSearch(false)}
        src={cross}
        alt=""
      />
    </div>
  ) : null;
}

export default SearchBar;
