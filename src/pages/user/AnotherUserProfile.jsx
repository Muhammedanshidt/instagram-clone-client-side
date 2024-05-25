import React, { useContext, useEffect,useState } from 'react'


import { IoIosSettings } from "react-icons/io";
import { IoMdGrid } from "react-icons/io";
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa";
import { Outlet, useNavigate, useParams } from 'react-router';
import './UserProfile.css'
import Clintcontex from '../userContext/ClientContext';
import axios from 'axios';
import PostComponent from './PostComponent';


function AnotherUserProfile() {
    const navigate = useNavigate()
const {userData,setModalOpen} = useContext(Clintcontex)
const [findUser,setFindUser] = React.useState([]) 
const [follow,setFollow]  = useState();

const [userFollowers,setUserFollowers] = useState(0)

const {userId} = useParams()


const checkingFollow = userData.following && userData.following.includes(findUser._id);

useEffect(() =>{



  const  getUserInfo = async ()=>{
    if(userData){
      try {
          const res= await axios.post("findUser",{username:userId})
        console.log("halllooo");
          console.log(res.data); 
          setFindUser(res.data) 
          setUserFollowers(res.data.followers.length) 

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





const [post,setPost] = useState([]);

useEffect( () => {

   const shoPost  = async () => {
    if(userData){
      try {
        const response = await axios.get('getUserPost',{params:{ownerId:findUser}})
        if(response.data.length > 0){
        // console.log(response);
        const {data} = response
        console.log(data,"uhfuierufyeuy");  
        setPost(data)

        console.log(post);
      }else{
        console.log("not get tin any data");
      }
        
      } catch (error) {
        console.log(error);
        alert(error.message)
      }
    }
   }
   shoPost();
}
, [findUser])







console.log(userFollowers,'userFollowers');


const followHandler= async (e) =>{ 
  // e.preventDefault()
  let userId = findUser._id;
  let currentUserId = userData._id;

  if(userId !== currentUserId ){
  setFollow(true)
  setUserFollowers(preState => preState + 1 )

  try{
  const res = await  axios.put('follow',{user:findUser,owner:userData})

  }catch(error){
    console.log(error);
  }
}
else{
  alert("You can't follow yourself!")
}
};

const unFollowHandler = async (e) => {
  console.log("unFollow");
  let userId = findUser._id;
  let currentUserId = userData._id;
  setFollow(false)
  setUserFollowers(preState => preState - 1 )


  
  try {
    const  res = await axios.delete('unfollow',{ data : {userId,currentUserId}})
    console.log(res.data);
    
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
    const response = await axios.get('getfollowers',{params:{owner:userData}})
   const followersData = response.data
    // console.log(followersData)
    setFollowers(followersData)
  console.log(followers);
} catch (err) {
  console.log(err)
}
}



const [following,setFollowing] = useState([])

const getFollowing = async (userData) => {


  document.getElementById('my_modal_get_following').showModal()


  try {
      const res = await axios.get('getfollowing',{params:{owner:userData}})
    const  followingData = await res.data
  // console.log("iudnf");
    setFollowing(followingData)
    console.log(followingData)
  } catch (error) {
    console.log(error);

  }
  
  
} 

// const { userData, setModalOpen } = useContext(Clintcontex);
const showModal = (item) => {
  console.log(item);
  // setPostId(item);
  setModalOpen(true);
  // console.log(showComponent);
  document.getElementById(item._id).showModal();
};
  return (

    <div className='w-full h-screen overflow-auto' id='scrollTabHide'>
    <div className='flex '>
        <div className='w-[350px] h-[250px]  flex justify-center items-center '>
        <img className=' w-fit size-24 rounded-full border border-3 border-gray-300' src={findUser?.profileimage || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"}  alt="profile"/>
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
            <p onClick={() => getFollowers (findUser)} className='cursor-pointer'> <span className='font-medium'>{userFollowers}</span>  followers</p>
            <p onClick={() => getFollowing (findUser)} className='cursor-pointer'> <span className='font-medium'>{findUser.following?.length}</span>  following</p>
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

    {post.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 mx-6 w-[97%] p-1">
          {post.map((item, index) => (
            
            <div key={index} className='cursor-pointer w-fit h-fit'
            onClick={() => showModal(item)}
          >
              <div>{console.log(item )}</div>
              {<div>{<PostComponent myProp={item._id} />}</div>}

              <img className="h-60 w-[350px] rounded-lg" src={item.imgUrl} alt="" />
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found</p>
      )}
     

    {/* GET FOLLOWERS USERS */}

    <dialog id="my_modal_get_followers" className="modal rounded-3xl p-6">
  <div className="modal-box ">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <div className='w-72 h-96 '>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      {
        followers.map((item) => (
          <Link to={`/user/${item.username}`}>
          <div className='w-full h-16 bg-slate-100 flex p-1 gap-3 items-center rounded-md m-1'>
          <img
          src={item.post || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"}
          className='size-12 rounded-full'
          />
          <p>{item.username}</p>
           </div>
           </Link>
        ))
      }
      </div>
    </form>
  </div>
</dialog>

 {/* GET FOLLOWING USERS */}

<dialog id="my_modal_get_following" className="modal rounded-3xl p-6">
  <div className="modal-box ">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <div className='w-72 h-96 '>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      {
    //   following.length === 0 ? 
      
    //   <p className='text-red-500 text-lg font-bold text-center'>You are not Following anyone yet!.</p>
    //  :
        following.map((item) => (
          <Link to={`/user/${item.username}`}>
          <div className='w-full h-16 bg-slate-100 flex p-1 gap-3 items-center rounded-md m-1'>
          <img
          src={item.profileimage || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"}
          className='size-12 rounded-full'
          />
          <p>{item.username}</p>
    
           </div>
           </Link>
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