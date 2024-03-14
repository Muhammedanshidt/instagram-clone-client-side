import React from 'react'
// import Profile from '../../asset/profile photo.jpg'
import Profile from "../../asset/profile-circle.svg"
import { IoIosSettings } from "react-icons/io";
import { IoMdGrid } from "react-icons/io";
// import SaveIcon from '../../asset/save icon.png'
import { FaHeart } from "react-icons/fa";
import { Outlet, useNavigate } from 'react-router';
import './UserProfile.css'

function UserProfile() {
    const navigate = useNavigate()

  return (

    <div className='w-full h-screen overflow-auto'>
    <div className='flex '>
        <div className='w-[350px] h-[250px]  flex justify-center items-center '>
        <img className='rounded-full w-[150px] border border-3 border-gray-300' src={Profile}  alt="profile"/>
        </div>
        <div className=' w-[700px] h-[250px]  flex-col '>
          <div className='flex gap-6 mt-6'>
            <p className='text-lg font-'>anshid_t</p>
            <button className='bg-gray-200 p-1 text-sm font-medium w-[90px] h-[30px] rounded-lg  ' onClick={() => navigate("/profile/edit")}>Edit Profile</button>
        <IoIosSettings className='size-7'/>
          </div>
          <div className='flex gap-8 mt-6'>
            <p> <span className='font-medium'>489</span>  posts</p>
            <p> <span className='font-medium'>10.6M</span>  followers</p>
            <p> <span className='font-medium'>456</span>  following</p>
          </div>
          <div className="mt-5">
            <p  className='font-medium font-mono text-lg mb-2'>MUHAMMED ANSHID</p>
            <p>MERN STACK Developer</p>
            <p>photography</p>
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
    {/* <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 mx-6">
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg" alt="" />
            </div>
            <div>
                <img className="h-auto max-w-full rounded-lg" src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg" alt="" />
            </div>
        </div> */}
    </div>

  )
}

export default UserProfile