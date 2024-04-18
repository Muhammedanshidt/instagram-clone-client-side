import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Clintcontex from "../userContext/ClientContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { constant } from "lodash";
import { values } from "lodash";
// import bcrypt from 'bcryptjs'

function UserPost() {
  const { userData } = useContext(Clintcontex);

  // console.log(userData);

  const [post, setPost] = useState([]);
  // const [hashId,setHashId]=useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [like, setLike] = useState(false);


  useEffect(() => {
    const shoPost = async () => {
      if (userData) {
        try {
          const response = await axios.get(
            "http://localhost:3003/user/getUserPost",
            { params: { ownerId: userData } }
          );
          const { data } = response;
          console.log(data);
          setPost(data);
        } catch (error) {
          console.log(error);
          alert(error.message);
        }
      }
    };
    shoPost();
  }, [userData]);


  const openModal = (item) => {
    setSelectedPost(item);
    console.log(item._id);
    document.getElementById("postModal").showModal();
  };
  const likeHandler = async () => {
    try {
      if (selectedPost) {
        setLike(!like);
        const response = await axios.post(
          "http://localhost:3003/user/userLike",
          { ownerId: userData._id, postId: selectedPost._id }
          
        );
        console.log("after axios");
        const data = response.data;
        console.log(data, "this is the responce from server");

      }
    } catch (error) {
      console.log("iede", error);
    }
  };

  const [commentValue,setCommentValue] =  useState('');

  // const commentInputHandler = (event) => {
  //   const value = event.target.value
  //   setCommentValue(value);
  //   console.log(commentValue);
  //   console.log(selectedPost);
  // }

  const inputRef = React.useRef(null)

  const  submitComment = async()=>{
    console.log("hello");
    try{
      const commentValue =inputRef.current.value;
    if(commentValue == 0){
      alert("no value")
    }
    else{

      if (inputRef.current) {
        inputRef.current.value = '';
    }
    
    const res = await axios.post('http://localhost:3003/user/userComment', {
      ownerId: userData._id,
      postId: selectedPost._id,
      commentvalue: commentValue
  });


    const {user,post} = res.data
    console.log(res.data);
    // console.log(user?user:null,"userdata")
    // console.log(post,"postData");

    }
  } catch(err){
    console.log("error in submitting the comment ", err);
  }

  }

  return (
    <div>
   {post.length > 0 ? (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 mx-6">
        {post.map((item, index) => {
            return (
                <div key={index}>
                    <Link to={`/profile?id=${item._id}`}>
                        <img
                            className="h-auto max-w-full rounded-lg"
                            src={item.imgUrl}
                            alt=""
                            onClick={() => openModal(item)}
                        />
                    </Link>
                </div>
            );
          
        })}
    </div>
) : (
    <p>No posts found</p>
)}

      {/* You can open the modal using document.getElementById('ID').showModal() method */}

      <dialog id="postModal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex w-[750px] h-[400px]">
            {post && (
              <div className="h-[400px] w-[400px] flex justify-center items-center">
                <img
                  src={selectedPost?.imgUrl}
                  alt={selectedPost?.caption}
                  className="h-full w-[400px] "
                />
              </div>
            )}
            <div className="h-full w-[350px] bg-white border-l-2 border-gray-200">
              <div className="flex p-2 bg-white">
                <img
                  src={userData?.profileimage}
                  className="size-10 object-contain rounded-full"
                />
                <p className="p-2 font-semibold">{userData?.username}</p>
              </div>
              <hr />
              <div className="h-[260px] w-full bg-white">
                {selectedPost?.caption ? (
                  <div className="flex px-2 py-1 gap-3 bg-slate-100 w-full h-fit">
                    <img
                      src={userData?.profileimage}
                      className="size-6  object-contain rounded-full"
                    />
                    <p>{selectedPost?.caption}</p>
                  </div>
                ) : null}
                <hr />
              </div>
              <div className="text-xs h-fit border-t-2">
                <div
                  className="h-fit w-fit"
                  onClick={() => likeHandler(selectedPost._id)}
                >
                  {like ? (
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
                  {/* {console.log(selectedPost,"before like")} */}
                  <p className="text-lg px-1"> {selectedPost?.like?.length}</p>
                </div>
                <hr/>
                  <div className="flex items-center">
                    <p className="text-lg">😊</p>
                    <input
                     type="text"
                     className="p-[7px] w-full outline-none"
                     placeholder="  Add a comment..."
                    //  onChange={commentInputHandler}
                    ref={inputRef}
                      />
                  <div className="m-1 text-sm cursor-pointer text-gray-500 font-semibold" onClick={() => submitComment()}>Post</div>
            
                  </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default UserPost;
