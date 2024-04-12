import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import Clintcontex from '../userContext/ClientContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
// import bcrypt from 'bcryptjs'

function UserPost() {

  const {userData} = useContext(Clintcontex)

  // console.log(userData);

  const [post,setPost] = useState([]);
  // const [hashId,setHashId]=useState("");
  const [selectedPost, setSelectedPost] = useState(null);
   const [like,setLike] = useState(false)
useEffect( () => {

   const shoPost  = async () => {
    if(userData){
      try {
        const response = await axios.get('http://localhost:3003/user/getUserPost',{params:{ownerId:userData}})
        const {data} = response
        console.log(data);
        setPost(data)

        
      } catch (error) {
        console.log(error);
        alert(error.message)
      }
    }
   }
   shoPost();
}
, [userData])

const openModal = (item) => {
  setSelectedPost(item)
  document.getElementById("postModal").showModal();

}




const likeHandler = async () => {
try{
 
  if(selectedPost){
    console.log("ihrfuu");


    const response = await axios.post('http://localhost:3003/user/userLike', { ownerId: userData._id, postId: selectedPost._id });
   console.log(response.data);
   const data = response.data

  }
}
catch(error){
  console.log("iede",error);
} 
}

  return (
    <div>
       {post.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 mx-6">
          {post.map((item, index) =>(
            <Link to={`/profile?id=${item._id}`}>
            <div key={index} onClick={()=> openModal (item)}>
              <img className="h-auto max-w-full rounded-lg " src={item.imgUrl} alt="" />
            </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No posts found</p>
      )}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

<dialog id="postModal" className="modal">
  <div className="modal-box">
    <form method="dialog">
      {/* if there is a button in form, it will close the modal */}
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
    </form>
    <div className='flex w-[750px] h-[400px]'>
      {
        post &&
      <div className='h-[400px] w-[400px] flex justify-center items-center'>
       <img src={selectedPost?.imgUrl} alt={selectedPost?.caption} 
       className='h-full w-[400px] '/>
      </div>
}
      <div className='h-full w-[350px] bg-white border-l-2 border-gray-200'>
        <div
        className='flex p-2 bg-white'
        >
          <img
          src={userData?.profileimage}
          className='size-10 object-contain rounded-full'
          />
          <p className='p-2 font-semibold'>{userData?.username}</p>
        </div>
        <hr/>
        <div className='h-[260px] w-full bg-white'>
            {
              selectedPost?.caption ?
          <div className='flex p-2 gap-3 bg-slate-100 w-full h-fit'>
            <img src={userData?.profileimage}
            className='size-6  object-contain rounded-full'/>
           <span>{selectedPost?.caption}</span><br/>
        </div>:null
            }
        <hr/>
        </div>
        <div className='p-2 text-xs bg-slate-100 h-20'>
                  
                 <div className='h-fit w-fit' onClick={()=> likeHandler (selectedPost._id)}>
                    {
                    selectedPost.like ?(
                      
                      <i className="text-red-500 text-3xl"><IoMdHeart /></i>       
                  ):
                   <i className="text-3xl"><IoMdHeartEmpty /></i>
                }
                 </div>

                  

        </div>
      </div>


    </div>
    
  </div>
</dialog>

    </div>
  )
}

export default UserPost