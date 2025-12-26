import logo from "../assets/frontend_assets/logo.png";
import search from "../assets/frontend_assets/search_icon.png";
import profile from "../assets/frontend_assets/profile_icon.png";
import cart from "../assets/frontend_assets/cart_icon.png";
import menu from "../assets/frontend_assets/menu_icon.png";
import drop from "../assets/frontend_assets/dropdown_icon.png";
import { Link, NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
function Navbar() {
  const [visible, setVisible] = useState(false);
  const { showSearch, setShowSearch, getCartCount, navigate, token, setToken } =
    useContext(ShopContext);

  //--------------logout function

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium">
      <img src={logo} className="w-36" alt="" />
      <ul className="hidden sm:flex gap-5 text-sm text-gray-700 ">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>HOME</p>
          <hr className="w-2/4 mx-auto border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4  mx-auto border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 ">
          <p>ABOUT</p>
          <hr className="w-2/4  mx-auto border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>CONTACT</p>
          <hr className="w-2/4  mx-auto border-none h-[1.5px] bg-gray-700 hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          src={search}
          onClick={() => setShowSearch(!showSearch)}
          alt=""
          className="w-5 cursor-pointer"
        />
        <div className="group relative">
          <Link to="/login">
            {" "}
            <img src={profile} className="w-5 cursor-pointer" alt="" />
          </Link>
          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className=" flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 r">
                <p className="cursor-pointer hover:text-black">My Profile</p>
                <p className="cursor-pointer hover:text-black">Orders</p>
                <p onClick={logout} className="cursor-pointer hover:text-black">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>
        <Link to="/cart" className="relative">
          <img src={cart} className="min-w-5 w-5" alt="" />
          <p className="absolute left-2 bottom-0 w-4 text-center leading-4 bg-black  rounded-full text-[8px] text-white">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={menu}
          className="w-5 cursor-pointer sm:hidden "
          alt=""
        />
      </div>
      <div
        className={`absolute h-screen top-0 right-0 overflow-hidden bg-white transition-all duration-300 ${
          visible ? "w-full" : "w-0"
        } `}
      >
        <div className="flex flex-col tex-gray-600">
          <div className="flex items-center gap-4 p-3 ">
            <img
              src={drop}
              className="h-4 rotate-180 cursor-pointer"
              onClick={() => setVisible(false)}
              alt=""
            />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 border border-gray-300 pl-6"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 border border-gray-300 pl-6"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 border border-gray-300 pl-6"
            to="/contact"
          >
            CONTACT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 border border-gray-300 pl-6"
            to="/about"
          >
            ABOUT
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
