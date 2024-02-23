import React from 'react'
import { useState } from 'react';
import { GoHomeFill } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { MdOutlineExplore } from "react-icons/md";
import Reel from '../../asset/instagram-reel.svg'
import { RiMessengerLine } from "react-icons/ri";
import { IoHeartOutline } from "react-icons/io5";
import { CgAddR } from "react-icons/cg";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMenu } from "react-icons/ai";
import TitleImage from "../../asset/title.png";
import { Outlet } from 'react-router';
import { useNavigate } from 'react-router';

const SideBar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate()
  return (
    <div>
      
      <div className="">
      {/* Sidebar */}
      <div className={`bg-white text-white w-60 border-r ${isSidebarOpen ? 'block' : 'hidden'} sm:block `}>
        <div className='text-white h-24 flex items-center justify-start pl-3 '>
       <img src={TitleImage} alt='logo' className='h-[32px]  ml-5'/>
        </div>
        <div className='h-[440px] p-4 pt-0 flex-col justify-start '>
        <div className='flex text-black p-4 gap-[15px] '>
            <div>
         <GoHomeFill className='size-6 '/>
            </div>
            <p>Home</p>
        </div>
        
        <div className='flex text-black p-4 gap-[15px]'>
            <div>
         <IoSearchOutline className='size-6'/>
            </div>
            <p>Search</p>
        </div>
        
        <div className='flex text-black p-4 gap-[15px]'>
            <div>
         <MdOutlineExplore className='size-6'/>
            </div>
            <p>Explore</p>
        </div>
        
        <div className='flex text-black p-4 gap-[15px]'>
            <div>
                <img src={Reel} alt="logo" />
            </div>
            <p>Reels</p>
        </div>
        
        <div className='flex text-black p-4 gap-[15px]'>
            <div>
         <RiMessengerLine className='size-6'/>
            </div>
            <p>Messages</p>
        </div>
        
        <div className='flex text-black p-4 gap-[15px]'>
            <div>
         <IoHeartOutline className='size-6'/>
            </div>
            <p>Notifications</p>
        </div>
        
        <div className='flex text-black p-4 gap-[15px]'>
            <div>
        <CgAddR className='size-6'/>
            </div>
            <p>Creat</p>
        </div>
        
        <div onClick={()=> navigate('/profile')} className='flex text-black p-4 gap-[15px]'>
            <div >
         <CgProfile className='size-6'/> 
            </div>
            <p>Profile</p>
        </div>
        </div>
        <div className='flex text-black h-[30px] m-8 flex gap-[15px]'>
        <AiOutlineMenu className='size-6' />
        <p>More</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow bg-gray-200">
        <button
          className="sm:hidden fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          Toggle Sidebar
        </button>
      </div>

      {/* Sidebar Icons for Small Screens */}
      <div className="fixed bottom-0 w-full bg-gray-800 text-white sm:hidden">
        <div className="flex justify-around p-4">
          <span className="text-2xl">&#128196;</span>
          <span className="text-2xl">&#128172;</span>
          <span className="text-2xl">&#128273;</span>
          <span className="text-2xl">&#128172;</span>
          <span className="text-2xl">&#128196;</span>
        </div>
      </div>
    </div>


    </div>

  )
  
}
<Outlet/>
export default SideBar
