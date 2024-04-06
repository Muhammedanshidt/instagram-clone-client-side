
import React, { useContext, useEffect, useState } from 'react';
import Clintcontex from "../userContext/ClientContext";
import axios from 'axios';
function UserMessage() {

  const {userData} = useContext(Clintcontex)  

 const [user,setUser]  =useState([])

console.log(userData);

  useEffect(()=>{
    const getUser = async () => {
      if(userData._id !== null){
        try{
        const response = await axios.get('http://localhost:3003/user/getuser')
        //  console.log(response.data);
          
        setUser(response.data)

      
        }catch(err){
          console.log("Error",err)
        }
        
    }else{
      alert( "Please Login First")
    }
    }
    getUser()
    } ,[userData]);

    

  return (
<>
    <div className='w-full h-screen overflow-auto'>

  <div className=' w-[350px] h-full'>
     <div className='ml-4'>
        <h3 className="text-xl font-bold">{userData?.username}</h3>
        <h3 className='font-bold mt-6'>Messages</h3>
     </div>
     <div className='w-full'>
  {user.length > 0 ?
    <div className='flex flex-col m-6 gap-2'>
      {user.map((item) => (
        <div key={item._id} className="flex items-center gap-2 bg-slate-100 p-2 rounded-3xl">
          <img className="rounded-full w-16 mt-2 object-contain" src={item.profileimage || "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"} alt="" />
          <div>
            <p className='m-2 font-medium'>{item.username}</p>
            <p className='m-2 font-normal text-sm text-slate-600'>Active 1 h ago</p>
          </div>
        </div>
      ))}
    </div>
    : null
  }
</div>
  </div>

    </div>
    </>
  )
}

export default UserMessage