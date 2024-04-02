import React, { useContext } from 'react'
// import Profile from '../../asset/profile photo.jpg'
import Profile from "../../asset/profile-circle.svg"
import { IoIosSettings } from "react-icons/io";
import { IoMdGrid } from "react-icons/io";
// import SaveIcon from '../../asset/save icon.png'
import { FaHeart } from "react-icons/fa";
import { Outlet, useNavigate } from 'react-router';
import './UserProfile.css'
import Clintcontex from '../userContext/ClientContext';
// import axios from 'axios';
// import React, { useEffect, useState } from 'react';



function UserProfile() {


    const navigate = useNavigate()
const {userData} = useContext(Clintcontex)

if(Object.keys(userData).length ===0){
    window.location.reload()
}
// console.log(userData)

  return (

    <div className='w-full h-screen overflow-auto'>
    <div className='flex '>
        <div className='w-[350px] h-[250px]  flex justify-center items-center '>
        <img className=' w-fit size-24 rounded-full border border-3 border-gray-300' src={userData?.profileimage}  alt="profile"/>
        </div>
        <div className=' w-[700px] h-[250px]  flex-col '>
          <div className='flex gap-6 mt-6'>
            <p className='text-lg font-'>{userData?.username}</p>
            <button className='bg-gray-200 p-1 text-sm font-medium w-[90px] h-[30px] rounded-lg  ' onClick={() => navigate("/profile/edit")}>Edit Profile</button>
        <IoIosSettings className='size-7 cursor-pointer' onClick={() => document.getElementById("my_modal_3_settings").showModal()}/>
 
        <dialog id="my_modal_3_settings" className="modal rounded-3xl shadow-2xl">
              <div className="modal-box ">
                <form method="dialog">
                  <button className="btn btn-sm text-xl font-bold  btn-circle btn-ghost absolute right-2 top-2 p-2">
                    ✕
                  </button>
                </form>
                <div className="bg-white p-6 h-96 ">
                  <h3 className="font-bold text-lg text-center m-5 w-64 ">
                    Edit Personal Deatails
                  </h3>
                  <hr className=" border-black my-4" />
                 
                  <label className="font-semibold text-lg mt-2"> Name</label>
                  <br/>
                    <input type='text' className='border mt-2 bg-slate-100 w-72 h-8'/>
                  <br/>
                  <label className='font-semibold text-lg mt-2"'>Username
                    <br/>
                    <input type='text' className='border mt-2 bg-slate-100 w-72 h-8'/>
                  </label><br/>

                  <button className='bg-blue-500 hover:bg-cyan-500 rounded-3xl mx-24 my-10 text-white text-lg font-semibold px-2 py-1 w-24'>Avatar</button>
               
                </div>
              </div>
            </dialog>


          </div>
          <div className='flex gap-8 mt-6'>
            <p> <span className='font-medium'>{userData.post?.length}</span>  posts</p>
            <p> <span className='font-medium'>{userData.followers?.length}</span>  followers</p>
          {console.log(userData,userData._id)}
            <p> <span className='font-medium'>{userData.following?.length}</span>  following</p>
          </div>
          <div className="mt-5">
            <p  className='font-medium font-mono text-lg mb-2'>{userData?.fullname}</p>
            <div className="w-60 h-24">
            <p>{userData?.bio}</p>
            </div>
          </div>
           
        </div>
    </div>
    <hr className='m-6 ml-20 w-[900px] border-t border-gray-300'/>
    <div className='flex text-gray-500 gap-16 mx-[350px] '>
       <p onClick={()=> navigate('/profile/')} className=' profileIcon font-medium flex text-sm cursor-pointer  hover:bg-gray-200 rounded-md hover:p-1'>
        <IoMdGrid className='size-5'/>
        Posts
       </p>
          
       <p onClick={()=> navigate('/profile/saved')} className=' profileIcon font-medium flex text-sm cursor-pointer hover:bg-gray-200 rounded-md hover:p-1 '>
       <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" viewBox="0 0 24 24" fill='#6B7280'>
    <path d="M 4 2 L 4 22 L 12 19 L 20 22 L 20 2 L 6 2 L 4 2 z"></path>
</svg> Saved
       </p>
       <p className=' profileIcon font-medium flex text-sm  hover:bg-gray-200 rounded-md hover:p-1'>
       <FaHeart className='size-5'/>
         Likes
       </p>
    </div>

    <Outlet/>
  
    </div>

  )
}

export default UserProfile