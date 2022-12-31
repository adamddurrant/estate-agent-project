import React from "react";
import { useLocation } from "react-router-dom"; //user URL location
import { useNavigate } from "react-router-dom"; //Internal linking

export default function Header() {
  const location = useLocation(); //initializing useLocation which is an object containing URL pathname
  const navigate = useNavigate();
  function pathMathRoute(route) {
    //function to set true if user is on path
    if (route === location.pathname) {
      return true;
    }
  }

  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50'>
      <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
        <div>
          <img
            className='h-5 cursor-pointer'
            src='../rdc-logo.svg'
            alt='logo'
            onClick={() => navigate("/")} //Go to home
          />
        </div>
        <div className=''>
          <ul className='flex space-x-10'>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute("/") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute("/offers") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            <li
              className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
                pathMathRoute("/sign-in") && "text-black border-b-red-500"
              }`}
              onClick={() => navigate("/sign-in")}
            >
              Sign in
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}
