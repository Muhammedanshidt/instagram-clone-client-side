import React from "react";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import PostComponent from "./PostComponent";
import { useContext } from "react";
import Clintcontex from "../userContext/ClientContext";

import { Link } from "react-router-dom";

function PostCard({ item, likeHandler, like }) {
  const { userData, setModalOpen } = useContext(Clintcontex);
  const showModal = () => {
    setModalOpen(true);
    document.getElementById(item._id).showModal();
  };

  return (
    <div className="flex max-sm:flex max-sm:justify-center le max-sm:items-center">
      <div className="  h-fit mt-4 border-t border-black">
        <Link to={`/user/${item?.userId?.username}`}>
          <div className="w-fit h-fit p-2 flex gap-3 cursor-pointer">
            <img
              src={item.userId?.profileimage}
              className="size-10 rounded-full object-cover"
              alt=""
            />
            <p>{item?.userId?.username}</p>
          </div>
        </Link>

        <div className="p-1 flex justify-center items-center">
          {item.file === "video" ? (
            <video src={item.imgUrl} className="w-[400px] h-[350px]" controls />
          ) : (
            <img
              src={item.imgUrl}
              alt={item.imgUrl}
              className="w-[400px] h-[350px]"
            />
          )}
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
            {item?.like?.includes(userData?._id) || like ? (
              <i className="text-red-500 text-2xl">
                <IoMdHeart />
              </i>
            ) : (
              <i className="text-2xl">
                <IoMdHeartEmpty />
              </i>
            )}
          </div>

          <div
            className="w-fit h-fit cursor-pointer mt-[2px]"
            onClick={showModal}
          >
            <FaRegComment className="text-xl text-zinc-800" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCard;
