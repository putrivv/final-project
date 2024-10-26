import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import ThemeContext from "./context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";

const Navbar = () => {
  const [getTheme, setTheme] = useContext(ThemeContext);
  const root = window.document.documentElement;
  const theme = useSelector((state) => state.theme.theme);
  const favorites = useSelector((state) => state.favorites);
  const dispatchRedux = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

 
  console.log("Current Theme:", getTheme);
  console.log("Current Favorites:", favorites);
  console.log("Current Search Term:", searchTerm); 

  const handleTheme = () => {
    if (getTheme === "light") {
      setTheme("dark");
      root.classList.remove("light");
      root.classList.add("dark");
    } else {
      setTheme("light");
      root.classList.remove("dark");
      root.classList.add("light");
    }
  };

  const isSearchPage = location.pathname === "/search";

  return (
    <div>
      {/* Navbar */}
      <div className={`navbar bg-opacity-30 backdrop-blur-lg fixed top-0 left-0 right-0 z-50 shadow-lg px-6 py-4 flex justify-between items-center ${getTheme === "light" ? "bg-slate-100" : "bg-gray-900"}`}>
        <div className="flex items-center space-x-8">
          <Link to="/" className="text-blue-700 dark:text-blue-500 text-3xl font-bold">
            AETHERMOVIES
          </Link>
        </div>

        <div className="flex items-center space-x-4 ml-auto">
          {!isSearchPage && (
            <Link to={`/search?query=${encodeURIComponent(searchTerm)}`}>
              <input
                type="text"
                placeholder="Search..."
                className="bg-opacity-60 bg-slate-950 dark:bg-gray-600 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  console.log("Updated Search Term:", e.target.value); 
                }}
                onFocus={() => setSearchTerm("")}
              />
            </Link>
          )}

          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              onChange={() => handleTheme()}
              checked={getTheme === "dark"}
            />
            {/* Sun icon */}
            <svg className="swap-off h-10 w-10 fill-current text-gray-900 dark:text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* Moon icon */}
            <svg className="swap-on h-10 w-10 fill-current text-gray-500 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="flex flex-col justify-center items-start space-y-1">
              <div className="w-6 h-1 bg-gray-900 dark:bg-gray-300"></div>
              <div className="w-6 h-1 bg-gray-900 dark:bg-gray-300"></div>
              <div className="w-6 h-1 bg-gray-900 dark:bg-gray-300"></div>
            </div>
          </label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-gray-200 dark:bg-gray-800 rounded-box w-52">
            <li>
              <Link to="/rated" className="text-gray-800 dark:text-gray-500">Rated</Link>
            </li>
            <li>
              <Link to="/favorite" className="text-gray-800 dark:text-gray-500">Favorites</Link>
            </li>
            <li>
              <Link to="/kategori" className="text-gray-800 dark:text-gray-500">Category</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
