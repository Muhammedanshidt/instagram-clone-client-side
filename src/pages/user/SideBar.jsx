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
import { IoIosSettings } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";

import UserNotification from "./UserNotification";
// import "./SideBar.css";

const SideBar = () => {

  const [menuOpen, setMenuOpen] = useState(false);


  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  const handleClickCreate = (e) => {
    document.getElementById("my_modal_3");
    navigate("/create");
  };

  const [isOpen, setIsOpen] = useState(false);



  const notificationHandle = () => {
    console.log("clicked");
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <div className=" h-screen w-screen" id="scrollTabHide">
        {/* Sidebar */}
        <div
          className={`fixed bg-white p-2 text-white w-[20%] h-screen border-r sm:block  bottom-3`}
        >
          <div className="text-white h-24 flex items-center justify-start pl-3 ">
            <img src={TitleImage} alt="logo" className="h-[32px]  ml-5 mt-16" />
          </div>
          <div className="h-[440px] p-4  flex-col  ">
            <div
              className="flex text-gray-600 p-4 gap-[15px] cursor-pointer hover:shadow-gray-700 hover:shadow-lg hover:bg-gray-50  hover:text-black rounded-lg "
              onClick={() => navigate("/home")}
            >
              <div>
                <GoHomeFill className="size-6 " />
              </div>
              <p>Home</p>
            </div>

            <div
              className="flex text-gray-600 p-4 gap-[15px] cursor-pointer hover:shadow-gray-700 hover:shadow-lg hover:bg-gray-50  hover:text-black rounded-lg "
              
              onClick={() => navigate("/search")}
            >
              <div>
                <IoSearchOutline className="size-6" />
              </div>
              <p>Search</p>
            </div>

            <div
              onClick={() => navigate("/explore")}
              className="flex text-gray-600 p-4 gap-[15px] cursor-pointer hover:shadow-gray-700 hover:shadow-lg hover:bg-gray-50  hover:text-black rounded-lg "
            >
              <div>
                <MdOutlineExplore className="size-6 " />
              </div>
              <p>Explore</p>
            </div>

            <div
              onClick={() => navigate("/reels")}
              className="flex text-gray-600 p-4 gap-[15px] cursor-pointer hover:shadow-gray-700 hover:shadow-lg hover:bg-gray-50  hover:text-black rounded-lg"
            >
              <div>
                <img src={Reel} alt="logo" />
              </div>
              <p>Reels</p>
            </div>

            <div
              onClick={() => navigate("/inbox")}
              className=" focus-div flex text-gray-600 p-4 gap-[15px] cursor-pointer hover:shadow-gray-700 hover:shadow-lg hover:bg-gray-50  hover:text-black rounded-lg"
            >
              <div>
                <RiMessengerLine className="size-6 " />
              </div>
              <p>Messages</p>
            </div>

            <div
              className="flex text-gray-600 p-4 gap-[15px] cursor-pointer hover:shadow-gray-700 hover:shadow-lg hover:bg-gray-50  hover:text-black rounded-lg"
              // onClick={()=> <UserNotification/>
              onClick={notificationHandle}
            >
              <div>
                <IoHeartOutline className="size-6" />
              </div>
              <p>Notifications</p>

              <UserNotification {...{ isOpen, setIsOpen }} />
            </div>

            <div
              className=" focus-div flex text-gray-600 p-4 gap-[15px] cursor-pointer hover:shadow-gray-700 hover:shadow-lg hover:bg-gray-50  hover:text-black rounded-lg "
              onClick={handleClickCreate}
            >
              <div>
                <CgAddR className="size-6 rounded-" />
              </div>
              <p>Creat</p>
            </div>



            <div
              onClick={() => navigate("/profile")}
              className="flex text-gray-600 p-4 gap-[15px] cursor-pointer  hover:shadow-gray-700 hover:shadow-lg hover:bg-gray-50  hover:text-black rounded-lg focus:text-blue-950"
            >
              <div>
                <CgProfile className="size-6" />
              </div>
              <p>Profile</p>
            </div>
          </div>

          <div
            className="ml-4 mt-4 flex text-gray-600 p-4 gap-[15px] cursor-pointer  hover:shadow-gray-700 hover:shadow-lg hover:bg-gray-50  hover:text-black rounded-lg focus:text-blue-950"
            onClick={toggleMenu}
          >
            <AiOutlineMenu className="size-6 " />
            <p>More</p>
          </div>

          <div
            className={`absolute bottom-10 h-fit w-max  rounded-xl text-black bg-slate-100 shadow-2xl left-40 ${
              menuOpen ? "block" : "hidden"
            }`}
            // onClick={toggleMenu}
          >
            <ul
              className=" flex flex-col items-center gap-2 p-3"
              onClick={toggleMenu}
            >
              <li
                className="menu-custom "
                onClick={() => navigate("/profile/edit")}
              >
                <IoIosSettings className="size-6"/>
                Edit Profile
              </li>
              <li className="menu-custom">
                <TbLogout2 className="size-6"/>
                Log Out</li>
              <li
                className="menu-custom"
                onClick={() => navigate("/profile/saved")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path d="M 4 2 L 4 22 L 12 19 L 20 22 L 20 2 L 6 2 L 4 2 z"></path>
                </svg>{" "}
                Saved
              </li>
            </ul>
          </div>
        </div>
        <div className="ml-60 h-full w-[80%] " id="scrollTabHide">
          <Outlet />
        </div>

        {/* Main Content */}

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
