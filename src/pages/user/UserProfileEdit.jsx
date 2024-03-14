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
      <textarea placeholder='Bio' autoFocus maxLength={100} onChange={handlChange}  className=" placeholder-gray-500 placeholder-opacity-70 p-1 font-semibold textarea textarea-bordered textarea-md w-[580px] h-20 border-2 rounded-2xl" ></textarea>
      <p className='absolute bottom-[10px] right-[10px] '>{valueCount}/100</p>
        </div>
      </div>

      <div className='mx-56'>

        <button className='bg-blue-500 hover:bg-cyan-400 text-white p-2 rounded-xl'onClick={() => document.getElementById("my_modal_3_edit").showModal()}>personal deatils</button>

      </div>

      <dialog id="my_modal_3_edit" className="modal rounded-3xl shadow-2xl">
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
  )
}

export default UserProfileEdit