import React, { useContext, useEffect, useState } from 'react'
import Clintcontex from '../userContext/ClientContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import UserPost from './UserPost';

function UserExplore() {

    const {userData} = useContext(Clintcontex)
    const [post,setPost] = useState([])

    console.log(userData);

useEffect(() => {

    if(userData){

        const getExplorePost = async () => {
            
            try {

            const response = await axios.get('http://localhost:3003/user/getExplorePost')

            console.log(response.data);
            setPost(response.data)
                
            } catch (error) {
                console.log(error)
            }
        }

        getExplorePost();

    }else{

        toast.error( "Please Login First" ) 

    }


} , [])



  return (
    <div className='w-full h-screen overflow-auto ml-6'>
        {
            post.length > 0 ?
<div className="grid grid-cols-2 gap-2 md:grid-cols-4 my-2 ">
    {post.map((item, index)=>(
    <div className="grid gap-4">
        <div key={index}>
            <img className="h-auto max-w-full rounded-lg object-cover object-center" src={item.imgUrl} alt={item.caption} onClick={() =>(<UserPost/>)}/>
        </div>
    </div>
    ))}
   
</div>
    :  
     null
        }
    </div>

  )
}

export default UserExplore