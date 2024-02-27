import React from 'react'
import UserProfile from '../../asset/user profile photo.jpg'
function UserMessage() {
  return (
<>
    <div className='w-full h-screen overflow-auto'>

  <div className=' w-[350px] h-full'>
     <div className='ml-4'>
        <h3 className="text-xl font-bold">anshid_t</h3>
        <h3 className='font-bold mt-6'>Messages</h3>
     </div>
     <div className=' w-full  '>
      <div className='flex m-6 gap-6'>
      <img className="rounded-full w-16 mt-4 " src={UserProfile } alt="" />
      <div>
      <p className='mt-5 font-medium '>siddiquee</p>
       <p className='mt-2 font-normal text-sm text-slate-600'>Active 1 h ago</p>
      </div>
      </div>
      <div className='flex m-6 gap-6'>
      <img className="rounded-full w-16 mt-4 " src={UserProfile } alt="" />
      <div>
      <p className='mt-5 font-medium '>siddiquee</p>
       <p className='mt-2 font-normal text-sm text-slate-600'>Active 1 h ago</p>
      </div>
      </div>
      <div className='flex m-6  gap-6'>
      <img className="rounded-full w-16 mt-4 " src={UserProfile } alt="" />
      <div>
      <p className='mt-5 font-medium '>siddiquee</p>
       <p className='mt-2 font-normal text-sm text-slate-600'>Active 1 h ago</p>
      </div>
      </div>
      <div className='flex m-6 gap-6'>
      <img className="rounded-full w-16 mt-4 " src={UserProfile } alt="" />
      <div>
      <p className='mt-5 font-medium '>siddiquee</p>
       <p className='mt-2 font-normal text-sm text-slate-600'>Active 1 h ago</p>
      </div>
      </div>

      <div className='flex m-6 gap-6'>
      <img className="rounded-full w-16 mt-4 " src={UserProfile } alt="" />
      <div>
      <p className='mt-5 font-medium '>siddiquee</p>
       <p className='mt-2 font-normal text-sm text-slate-600'>Active 1 h ago</p>
      </div>
      </div>
      <div className='flex m-6 gap-6'>
      <img className="rounded-full w-16 mt-4 " src={UserProfile } alt="" />
      <div>
      <p className='mt-5 font-medium '>siddiquee</p>
       <p className='mt-2 font-normal text-sm text-slate-600'>Active 1 h ago</p>
      </div>
      </div>
      <div className='flex m-6 gap-6'>
      <img className="rounded-full w-16 mt-4 " src={UserProfile } alt="" />
      <div>
      <p className='mt-5 font-medium '>siddiquee</p>
       <p className='mt-2 font-normal text-sm text-slate-600'>Active 1 h ago</p>
      </div>
      </div>

      <div className='flex m-6 gap-6'>
      <img className="rounded-full w-16 mt-4 " src={UserProfile } alt="" />
      <div>
      <p className='mt-5 font-medium '>siddiquee</p>
       <p className='mt-2 font-normal text-sm text-slate-600'>Active 1 h ago</p>
      </div>
      </div>

     </div>

     
  </div>

    </div>
    </>
  )
}

export default UserMessage