import React from 'react'
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import PostComponent from "./PostComponent";
import { useContext } from "react";
import Clintcontex from "../userContext/ClientContext";


import { Link } from "react-router-dom";




function PostCard({item,likeHandler,like}) {
  const { userData, setModalOpen } = useContext(Clintcontex);
  const showModal = () => {
    console.log(item);
    // setPostId(item);
    setModalOpen(true);
    // console.log(showComponent);
    document.getElementById(item._id).showModal();
  };


 
  return (
    <div className="">
    <div className=" w-fit h-fit mt-4 border-t border-black">
      <Link to={`/user/${item?.userId?.username}`}>
        <div className="w-fit h-fit p-2 flex gap-3 cursor-pointer">
          <img
            src={item.userId.profileimage}
            className="size-10 rounded-full"
            alt=""
          />
          <p>{item?.userId?.username}</p>
        </div>
      </Link>

      <div
        
        className="p-1 flex justify-center items-center"
      >
        <img src={item.imgUrl} className="w-[400px] h-[350px]" />
      </div>
      <div className="w-full h-fit pl-1 ">
        <span className="text-sm font-semibold">
          {item?.userId?.username}
        </span>
        <span className="ml-2 text-sm">{item.caption}</span>
      </div>
      {<div>{<PostComponent myProp={item._id} />}</div>}
      <div className="text-xs h-fit m-1 flex gap-2">
        <div
          className="h-fit w-fit cursor-pointer"
          onClick={() => likeHandler(item?._id)}
        >
          {item?.like?.includes(userData._id) || like ? (
            <i className="text-red-500 text-2xl">
              <IoMdHeart />
            </i>
          ) : (
            <div>
              <i className="text-2xl">
                <IoMdHeartEmpty />
              </i>
            </div>
          )}

          <p className="text-lg px-1"> {item?.like?.length}</p>
        </div>
        <div
          className="w-fit h-fit cursor-pointer"
          onClick={showModal}
        >
          <FaRegComment className="text-xl text-zinc-800" />
        </div>
        {/* {showComponent ?

      <div className="z-40">
         <PostComponent selectId={item?._id}/>
      </div>
      :<div >
        <p>kujguyvrkucgvuergoucverouvueroui</p>
        </div>} */}
        {/* </div> */}
      </div>
    </div>
  </div>
  )
}

export default PostCard