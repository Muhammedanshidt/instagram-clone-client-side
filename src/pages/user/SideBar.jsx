import React from "react";
import { useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import Reel from "../../asset/instagram-reel.svg";
import { RiMessengerLine } from "react-icons/ri";
import { IoHeartOutline } from "react-icons/io5";
import { CgAddR } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import TitleImage from "../../asset/title.png";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
// import "./SideBar.css";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();
  return (
    <div>
      <div className=" h-screen flex ">
        {/* Sidebar */}
        <div
          className={`bg-white text-white w-60 h-screen border-r ${
            isSidebarOpen ? "block" : "hidden"
          } sm:block `}
        >
          <div className="text-white h-24 flex items-center justify-start pl-3 ">
            <img src={TitleImage} alt="logo" className="h-[32px]  ml-5" />
          </div>
          <div className="h-[440px] p-4 pt-0 flex-col justify-start ">
            <div className="flex text-black p-4 gap-[15px] cursor-pointer hover:bg-gray-100 rounded-lg ">
              <div>
                <GoHomeFill className="size-6 " />
              </div>
              <p>Home</p>
            </div>

            <div className="flex text-black p-4 gap-[15px] cursor-pointer hover:bg-gray-100 rounded-lg">
              <div>
                <IoSearchOutline className="size-6" />
              </div>
              <p>Search</p>
            </div>

            <div
              onClick={() => navigate("/explore")}
              className="flex text-black p-4 gap-[15px] cursor-pointer hover:bg-gray-100 rounded-lg "
            >
              <div>
                <MdOutlineExplore className="size-6 " />
              </div>
              <p>Explore</p>
            </div>

            <div className="flex text-black p-4 gap-[15px] cursor-pointer hover:bg-gray-100 rounded-lg">
              <div>
                <img src={Reel} alt="logo" />
              </div>
              <p>Reels</p>
            </div>

            <div
              onClick={() => navigate("/inbox")}
              className=" focus-div flex text-black p-4 gap-[15px] cursor-pointer hover:bg-gray-100 rounded-lg"
            >
              <div>
                <RiMessengerLine className="size-6 " />
              </div>
              <p>Messages</p>
            </div>

            <div className="flex text-black p-4 gap-[15px] cursor-pointer hover:bg-gray-100 rounded-lg">
              <div>
                <IoHeartOutline className="size-6" />
              </div>
              <p>Notifications</p>
            </div>

            <div className=" focus-div flex text-black p-4 gap-[15px] cursor-pointer hover:bg-gray-100 rounded-lg">
              <div>
                <CgAddR className="size-6 rounded-" />
              </div>
              <p>Creat</p>
            </div>

            <div
              onClick={() => navigate("/profile")}
              className="flex text-black p-4 gap-[15px] cursor-pointer "
            >
              <div>
                <CgProfile className="size-6" />
              </div>
              <p>Profile</p>
            </div>
          </div>
          <div
            onClick={toggleMenu}
            className="flex  text-black h-[30px] m-8 flex gap-[15px] cursor-pointer hover:bg-gray-100 rounded-lg"
          >
                  {menuOpen && (
        <div
        className=" absolute left-8 bottom-16 origin-top-left w-56 h-64 bg-slate-200 shadow-xl divide-y rounded-lg  divide-gray-100 ring-1 ring-black ring-opacity-5 focus:outline-none"
          // className="absolute  left-0 mb-2 origin-top-left bg-slate-800 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          // role="menu"
          // aria-orientation="vertical"
          // aria-labelledby="menu-button"
          // tabIndex="-1"
          // style={{ minWidth: '10rem' }}
        >
          <div className=" absolute bottom-3 py-1">
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-0"
            >
              Item 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex="-1"
              id="menu-item-1"
            >
              Item 2
            </a>
          </div>
        </div>
      )}
            <AiOutlineMenu className="size-6" />
            <p>More</p>
          </div>
        </div>
        <div className="">
          <Outlet />
        </div>

        {/* Main Content */}

        {/* Sidebar Icons for Small Screens */}
        <div className="fixed bottom-0 w-screen bg-white sm:hidden">
          <div className="flex gap-10 px-4 py-2">
            <div>
              <GoHomeFill className="size-6  text-black " />{" "}
            </div>
            <div>
              {" "}
              <MdOutlineExplore
                onClick={() => navigate("/explore")}
                className="size-6  text-black "
              />{" "}
            </div>
            <div>
              {" "}
              <img src={Reel} alt="logo" />
            </div>
            <div>
              <CgAddR className="  text-black size-6 rounded-lg " />{" "}
            </div>
            <div>
              {" "}
              <RiMessengerLine
                onClick={() => navigate("/inbox")}
                className=" text-black size-6 "
              />
            </div>
            <div>
              {" "}
              <CgProfile
                onClick={() => navigate("/profile")}
                className=" text-black size-6"
              />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
