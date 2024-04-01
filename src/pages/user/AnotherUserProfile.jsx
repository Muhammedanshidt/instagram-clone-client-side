import React, { useContext, useEffect,useState } from 'react'
// import Profile from '../../asset/profile photo.jpg'
import { IoIosSettings } from "react-icons/io";
import { IoMdGrid } from "react-icons/io";
// import SaveIcon from '../../asset/save icon.png'
import { FaHeart } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from 'react-router';
import './UserProfile.css'
import Clintcontex from '../userContext/ClientContext';
import axios from 'axios';


function AnotherUserProfile() {
    const navigate = useNavigate()
const {userData} = useContext(Clintcontex)
const [findUser,setFindUser] = React.useState([]) 
const [follow,setFollow]  = useState();




// if(Object.keys(userData).length ===0){
//     window.location.reload()
// }
// console.log(findUser);
const {userId} = useParams()
// console.log(userId)

const checkingFollow = userData.following && userData.following.includes(findUser._id);

useEffect(() =>{

//   const checkingFollow = userData.following && userData.following.includes(findUser._id);

// if(checkingFollow){
//   setFollow(true)
// }else{
//   setFollow(false)
// }

  const  getUserInfo = async ()=>{
    if(userData){
      try {
          const res= await axios.post("http://localhost:3003/user/findUser",{username:userId})
        console.log("halllooo");
          // console.log(res.data); 
          setFindUser(res.data)  
        //  console.log('this is the data',res.data)
      } catch (error) {
        alert("Error")
      }
    }
  }
   getUserInfo(); 
   
   if(checkingFollow){
     setFollow(true)
   }else{
     setFollow(false)
   }  
} , [checkingFollow,userData])


// following 


const followHandler= async (e) =>{ 
  // e.preventDefault()
  let userId = findUser._id;
  let currentUserId = userData._id;

  if(userId !== currentUserId ){
  try{
  const res = await  axios.put('http://localhost:3003/user/follow',{user:findUser,owner:userData})
  console.log(res.data);
  setFollow(true)
  window.location.reload();

  }catch(error){
    console.log(error);
  }
}
else{
  alert("You can't follow yourself!")
}
};

const unFollowHandler = async (e) => {
  
  try {
    const result = await axios.delete('http://localhost:3003/user/unfollow',{user:findUser,owner:userData} )
    console.log(result.data);
    setFollow(false)
    
  } catch (error) {
    console.log(error);
  }
}

const [followers,setFollowers] = useState([])

const getFollowers = async (userData) => {
  // e.preventDefault()
  console.log("get Follower");
  console.log(userData);
  document.getElementById('my_modal_get_followers').showModal()

  try {
    const response = await axios.get('http://localhost:3003/user/getfollowers',{params:{owner:userData}})
   const followersData = response.data
    // console.log(followersData)
    setFollowers(followersData)
  console.log(followers);
} catch (err) {
  console.log(err)
}
}
    

  



// const checkingFollow = userData.following.includes[findUser._id];
// // console.log(checkingFollow);


// const checkingFollow = userData.following && userData.following.includes(findUser._id);


// const checkingUnFollow = userData.followers && userData.followers.includes(findUser._id);



// const checkingUnFollow = userData.followers && userData.followers.includes(findUser._id);




  return (

    <div className='w-full h-screen overflow-auto'>
    <div className='flex '>
        <div className='w-[350px] h-[250px]  flex justify-center items-center '>
        <img className=' w-fit size-24 rounded-full border border-3 border-gray-300' src={findUser?.profileimage}  alt="profile"/>
        </div>
        <div className=' w-[700px] h-[250px]  flex-col '>
          <div className='flex gap-6 mt-6'>
            <p className='text-lg font-'>{findUser?.username}</p>

          {
            !follow ?(
            <button className='bg-blue-600 text-white p-1 text-sm font-medium w-[90px] h-[30px] rounded-lg ' onClick={followHandler}>Follow</button>
            ):(
            <button className='bg-gray-500 text-white p-1 text-sm font-medium w-[90px] h-[30px] rounded-lg  'onClick={unFollowHandler}>Following</button>
            )
          }


    
          </div>
          <div className='flex gap-8 mt-6'>
            <p> <span className='font-medium'>{findUser.post?.length}</span>  posts</p>
            <p onClick={() => getFollowers (findUser)} className='cursor-pointer'> <span className='font-medium'>{findUser.followers?.length}</span>  followers</p>
            <p> <span className='font-medium'>{findUser.following?.length}</span>  following</p>
          </div>
          <div className="mt-5">
            <p  className='font-medium font-mono text-lg mb-2'>{findUser?.fullname}</p>
            <div className="w-60 h-24">
            <p>{findUser?.bio}</p>
            </div>
          </div>   
        </div>

    </div>
    <hr className='mb-6 ml-20 w-[900px] border-t border-gray-300'/>
    <div className=' p-4 w-full h-fit bg-orange-300 '>
      <div className=' flex w-80'>
        <img 
        src={findUser?.profileimage}
        className='border-gray-950 border-2'
        />
      </div>
       {/* <p onClick={()=> navigate('/profile/')} className=' profileIcon font-medium flex text-sm cursor-pointer  hover:bg-gray-200 rounded-md hover:p-1'>
        <IoMdGrid className='size-5'/>
        Posts
       </p> */} 
    </div>

    <dialog id="my_modal_get_followers" className="modal rounded-3xl p-6">
  <div className="modal-box ">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <div className='w-72 h-96 '>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      {
        followers.map((item) => (
          <div className='w-full h-16 bg-slate-100 flex p-1 gap-3 items-center rounded-md m-1'>
          <img
          src={item.profileimage || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"}
          className='size-12 rounded-full'
          />
          <p>{item.username}</p>
    
           </div>
        ))
      }
      </div>
    </form>
  </div>
</dialog>

    <Outlet/>
  
    </div>

  )
}

export default AnotherUserProfile