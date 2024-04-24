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
import { IoIosImages } from "react-icons/io";
import Creat from "../user/sideBarPages/CreatPost";
// import "./SideBar.css";

const SideBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [image, setImage] = useState([]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  const handleClickCreate = (e) => {
    document.getElementById("my_modal_3");
    navigate("/create");
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className=" h-screen flex " id="scrollTabHide">
        {/* Sidebar */}
        <div
          className={`fixed bg-white text-white w-60 h-screen border-r ${
            isSidebarOpen ? "block" : "hidden"
          } sm:block `}
        >
          <div className="text-white h-24 flex items-center justify-start pl-3  ">
            <img src={TitleImage} alt="logo" className="h-[32px]  ml-5" />
          </div>
          <div className="h-[440px] p-4  flex-col justify-start  ">
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
              // onClick={()=>document.getElementById('my_modal_4').showModal()}
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

            <div className="flex text-gray-600 p-4 gap-[15px] cursor-pointer hover:shadow-gray-700 hover:shadow-lg hover:bg-gray-50  hover:text-black rounded-lg">
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

            <div className="flex text-gray-600 p-4 gap-[15px] cursor-pointer hover:shadow-gray-700 hover:shadow-lg hover:bg-gray-50  hover:text-black rounded-lg">
              <div>
                <IoHeartOutline className="size-6" />
              </div>
              <p>Notifications</p>
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

            {/* <Creat/> */}

            {/* UPLOAD IMAGE */}
            {/* <dialog id="my_modal_3" className="modal rounded-3xl shadow-2xl">
              <div className="modal-box ">
                <form method="dialog">
                  <button className="btn btn-sm text-xl font-bold  btn-circle btn-ghost absolute right-2 top-2 p-2">
                    ✕
                  </button>
                </form>
                <div className="bg-white p-6 h-96 ">
                  <h3 className="font-bold text-lg text-center m-5 w-64 ">
                    Create new post
                  </h3>
                  <hr className=" border-black my-4" />
                  <div className=" flex justify-center">
                    <IoIosImages className="size-20 align-bottom mt-10" />
                  </div>
                  <h1 className="font-medium text-center mt-3 mb-6">
                    Upload Photos Here
                  </h1>
                  <label
                    htmlFor="fileInput"
                    className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-md px-3 py-2 mx-20 my-6 cursor-pointer"
                  >
                    Select From Computer
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    // className="hidden"
                    onChange={(e) => setImage(e.target.files)}
                    multiple
                    accept="image/*"
                  />
                </div>
              </div>
            </dialog> */}

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
            className="flex  text-black h-[30px] m-8 flex gap-[15px] cursor-pointer hover:bg-gray-100 rounded-lg"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            <AiOutlineMenu className="size-6" />
            <p>More</p>
            <dialog id="my_modal_2" className="modal">
              <div className="modal-box">
                <h3 className="font-bold text-lg">Hello!</h3>
                <p className="py-4">Press ESC key or click outside to close</p>
              </div>
              <form method="dialog" className="modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          </div>
        </div>
        <div className="ml-56">
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
