import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Clintcontex from "../userContext/ClientContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

const PostComponent = (props) => {

  const { userData } = useContext(Clintcontex);


  const [post, setPost] = useState([]);
  const [selectedPost, setSelectedPost] = useState([]);
  const [like, setLike] = useState(false);
  const [commentedUser, setCommentedUser] = useState([]);
  const [commentedPost, setCommentedPost] = useState([]);
  const [mapComment, setMapComment] = useState([]);
  const [currentPost,setCurrentPost] = useState()
  

  // console.log(props ,"passing to com");


  useEffect (() => {
  setCurrentPost(props.myProp || "661a2ca50480d4865c3035af")
  console.log(currentPost);
  // console.log(props ,"passing to com");
  

  },[currentPost])

  console.log(currentPost);


// console.log(name);
  

  useEffect(() => {
    const shoPost = async () => {
      if (currentPost) {
        try {
          const response = await axios.get(
            "http://localhost:3003/user/getPost",
            {
              params: { Id: currentPost },
            }
          );
          // const {post} = response.data;
          // console.log(post);
          // setPost(post);

        } catch (error) {
          console.error("Error fetching post:", error);
        }
  //       // console.log(data.postData);
  //       // setMapComment(data.postData)
        
      }
    };
  //   shoPost();
  }, [userData]);


  // const openModal = (item) => {
  //   setSelectedPost(item)
  //   // item.like.include(userId) ? setLike(true):setLike(false)
  //   setLike(item.like.includes(userData._id));  
  //   document.getElementById("postModal").showModal();
  //   console.log(selectedPost,"onselect post");

  // };

  // const likeHandler = async () => {
  //   try {
  //     if (selectedPost) {
  //       const response = await axios.post(
  //         "http://localhost:3003/user/userLike",
  //         { ownerId: userData._id, postId: selectedPost._id }
          
  //       );
  //       setLike(!like);
  //       console.log("after axios");
  //       const data = response.data;

  //       console.log(data, "this is the responce from server");
  //     }
  //   } catch (error) {
  //     console.log("iede", error);
  //   }
  // };

  
  // const inputRef = React.useRef(null);

  // const submitComment = async () => {
  //   console.log("hello");
  //   try {
  //     const commentValue = inputRef.current.value;
  //     if (commentValue == 0) {
  //       alert("no value");
  //     } else {
  //       if (inputRef.current) {
  //         inputRef.current.value = "";
  //       }

  //       const res = await axios.post("http://localhost:3003/user/userComment", {
  //         ownerId: userData._id,
  //         postId: selectedPost._id,
  //         commentvalue: commentValue,
  //       });

  //       const { data } = res;
  //       const { user, post } = data;

  //       if (user && post) {
  //         setCommentedUser(user);
  //         setCommentedPost(post);
  //       }

  //       console.log(commentedUser);
  //       console.log(commentedPost);
  //       console.log(selectedPost.comments);
  //     }
  //   } catch (err) {
  //     console.log("error in submitting the comment ", err);
  //   }
  // };


  return (
    <div>


      {/* <h1>hello</h1> */}
{/* 
<dialog id="postModal" className="modal">
        {console.log(selectedPost)}
        <div className="modal-box">
          <form method="dialog"> */}
            {/* if there is a button in form, it will close the modal */}
            {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex w-[750px] h-[450px]">
            {post && (
              <div className="h-full w-fit flex justify-center items-center">
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
                  className="size-10 object-cover rounded-full"
                />
                <p className="p-2 font-semibold">{userData?.username}</p>
              </div>
              <hr />
              <div className="h-[260px] w-full bg-white">
                {selectedPost?.caption ? (
                  <div className="flex px-2 py-1 gap-3 bg-slate-100 w-full h-fit">
                    <img
                      src={userData?.profileimage}
                      className="size-6  object-cover rounded-full"
                    />
                    <p>{selectedPost?.caption}</p>
                  </div>
                ) : null}
                <hr />
                <div
                  className="h-full px-3 py-3 overflow-x-hidden overflow-y-scrol overscroll-none"
                  id="scrollTabHide"
                >
                  {selectedPost?.comments
                    ?.filter((comment) => selectedPost?._id == comment.postId)
                    .map((comment, index) => {
                      console.log(mapComment);
                      return (
                        <div
                          className="bg-gray-200 w-full h-14 mt-2"
                          key={index}
                        >
                          <div className="flex gap-2 p-1">
                            <img
                              src={mapComment}
                              className="size-8  object-cover rounded-full"
                            />
                            <p className="text-xs">
                              {selectedPost?.comments?.userId?.username}
                            </p>
                            <span>{comment?.text}</span>
                            <div></div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="text-xs h-fit border-t-2 mt-8">
                <div
                  className="h-fit w-fit cursor-pointer"
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
                  <p className="text-lg px-1"> {selectedPost?.like?.length}</p>
                </div>
              </div>
              <div>
                <hr />
                <div className="flex items-center">
                  <p className="text-lg">😊</p>
                  <input
                    type="text"
                    className="p-[7px] w-full outline-none"
                    placeholder="  Add a comment..."
                    //  onChange={commentInputHandler}
                    ref={inputRef}
                  />
                  <div
                    className="m-1 text-sm cursor-pointer text-gray-500 font-semibold"
                    onClick={() => submitComment()}
                  >
                    Post
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog> */}
      
    </div>
  )
}

export default PostComponent
