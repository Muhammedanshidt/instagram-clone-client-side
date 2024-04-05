import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import Clintcontex from '../userContext/ClientContext'
import axios from 'axios'

function UserPost() {

  const {userData} = useContext(Clintcontex)

  // console.log(userData);

  const [post,setPost] = useState([]);

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



  return (
    <div>
       {post.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 mx-6">
          {post.map((item, index) => (
            <div key={index}>
              <img className="h-auto max-w-full rounded-lg" src={item.imgUrl} alt="" />
            </div>
          ))}
        </div>
      ) : (
        <p>No posts found</p>
      )}
    </div>
  )
}

export default UserPost