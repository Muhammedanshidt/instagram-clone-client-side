import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import Clintcontex from '../userContext/ClientContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import bcrypt from 'bcryptjs'

function UserPost() {

  const {userData} = useContext(Clintcontex)

  // console.log(userData);

  const [post,setPost] = useState([]);
  // const [hashId,setHashId]=useState("");
  const [selectedPost, setSelectedPost] = useState(null);

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



  return (
    <div>
       {post.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 mx-6">
          {post.map((item, index) =>(
            <Link to={`/profile?id=${item._id}`}>
            <div key={index} onClick={()=> openModal (item)}>
              <img className="h-auto max-w-full rounded-lg" src={item.imgUrl} alt="" />
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
      <div className='h-full w-[350px] bg-orange-400 border-l-2 border-gray-200'>
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
        <div className='h-[260px] w-full bg-cyan-500'></div>
        <div className='p-2 text-xs'>
          <span>{selectedPost?.caption}</span><br/>
          <a href={`https://www.instagram.com/p/${selectedPost?.code}/`} target='_blank'></a>

        </div>
      </div>


    </div>
    
  </div>
</dialog>

    </div>
  )
}

export default UserPost