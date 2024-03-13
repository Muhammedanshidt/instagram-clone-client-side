import React, { useState } from 'react'
import Profile from "../../asset/profile-circle.svg"

function UserProfileEdit() {

  const [valueCount,setValueCount] = useState(0)

  const handlChange = (e) => {
    setValueCount(e.target.value.length);

     if(e.target.value.length >= 100){
      alert("100 is limit")
     }
  }
  return (
    <div className=' mx-36 mt-10 w-[600px] p-2'>
      <h1 className='text-xl font-bold'> Edit Profile </h1>
      <div className='bg-gray-100 mt-12 border rounded-2xl flex'>
        <div className="flex">
        <img className=' mx-3 size-20' src={Profile}  alt="profile"/>
        <div className='mt-3'>
          <h1 className='font-bold'>anshid t</h1>
          <h1 className='text-gray-400 '>muhammed anshid t</h1>
        </div>
        </div>
        <div className="mt-7 mx-28">
        <label
         htmlFor="fileInput"
         className="bg-blue-400 hover:bg-blue-600 text-white text-sm font-semibold rounded-md py-2 px-2 cursor-pointer"
                  >
                    Change photo
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={(e) => e.target.files}
                    multiple
                    accept="image/*"
                  />
        </div>
      </div>
      <div className='my-10'>
        <h1 className='my-3 mx-3 text-lg font-semibold'>Bio</h1>
        <div className='relative'>
      <textarea placeholder='Bio' autoFocus maxLength={100} onChange={handlChange}  className="font-semibold textarea textarea-bordered textarea-md w-[580px] h-20 border-2 rounded-2xl" ></textarea>
      <p className='absolute bottom-[10px] right-[10px] '>{valueCount}/100</p>
        </div>
      </div>

      <div>

      </div>
        
    </div>
  )
}

export default UserProfileEdit