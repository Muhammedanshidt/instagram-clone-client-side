import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Clintcontex from "../userContext/ClientContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";

const PostComponent = ({ myProp}) => {
  const { userData } = useContext(Clintcontex);
  console.log('myProp:', myProp);
  const [post, setPost] = useState([]);
  const [selectedPost, setSelectedPost] = useState([]);
  const [like, setLike] = useState(false);
  const [commentedUser, setCommentedUser] = useState([]);
  const [commentedPost, setCommentedPost] = useState([]);
  const [mapComment, setMapComment] = useState([]);
  const [currentPost, setCurrentPost] = useState();
  // const [isModalOpen, setIsModalOpen] = useState(false);

console.log("this is postcomponent");
  console.log( myProp ,"passing to com");


  // const randomNumber = Math.floor(Math.random() * 1000) + 1;
  useEffect(() => {
  
    setCurrentPost(myProp || "661a2d2a0480d4865c3035da");
     // setCurrentPost(props.myProp || "661a2ca50480d4865c3035af");
    // setCurrentPost(props.myProp || "661a2d120480d4865c3035d7");
    console.log(currentPost);
    

    const shoPost = async () => {
      console.log("before pass");
      if (currentPost) {
        try {
          const response = await axios.get(
            "http://localhost:3003/user/grtPostModal",
            {
              params: { currentPost },
            }
          );
          const posts = response.data;
          console.log(posts, "response data");
          setPost(posts);
          setMapComment(posts.comments);
          if (post) {
           document.getElementById(currentPost).showModal() 
          }
           // Open the modal
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      }
    }; 
shoPost();
  },[myProp]);
  

  console.log(currentPost);

  // console.log(name);





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


      <dialog id={currentPost} className={`modal ${post?"block":"hidden"}`}>
        {console.log(post,"uioguiguiotfghkluio")}

        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex w-[750px] h-[450px]">
            {post && (
              <div className="h-full w-fit flex justify-center items-center">
                <img
                  src={post?.imgUrl}
                  alt={post?.caption}
                  className="h-full w-[400px] "
                />
              </div>
            )}
            <div className="h-full w-[350px] bg-white border-l-2 border-gray-200">
            <Link to={`/user/${post?.userId?.username}`}>
              <div className="flex p-2">
                <img
                  src={post?.userId?.profileimage}
                  className="size-10 object-cover rounded-full"
                />
                <p className="p-2 font-semibold">{post?.userId?.username}</p>
              </div>
              </Link>
              <hr />
              <div className="h-[260px] w-full bg-white">
                {post?.caption ? (
                  <div className="flex px-2 py-1 gap-3 bg-slate-100 w-full h-fit">
                    <img
                      src={post?.userId?.profileimage}
                      className="size-6  object-cover rounded-full"
                    />
                    <p>{post?.caption}</p>
                  </div>
                ) : null}
                <hr />
                <div
                  className="h-full px-3 py-3 overflow-x-hidden overflow-y-scrol overscroll-none"
                  id="scrollTabHide"
                >
                  {console.log("check work or not")}
                  {mapComment
                    // ?.filter((comment) => comment.postId === post?._id)
                    .map((comment, index) => {
                      console.log(comment, "map comment");
                      return (
                        <div
                          className="bg-gray-200 w-full h-14 mt-2"
                          key={index}
                        >
                          <div className="flex gap-2 p-1">
                            <img
                              src={comment?.userId?.profileimage}
                              className="size-8  object-cover rounded-full"
                            />
                            <div className="gap-2">
                            <p className="text-base">
                              {comment?.userId?.username}
                            </p>
                            <span>{comment?.text}</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="text-xs h-fit border-t-2 mt-8">
                <div
                  className="h-fit w-fit cursor-pointer"
                  // onClick={() => likeHandler(selectedPost._id)}
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
                  <p className="text-lg px-1"> {post?.like?.length}</p>
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
                    // ref={inputRef}
                  />
                  <div
                    className="m-1 text-sm cursor-pointer text-gray-500 font-semibold"
                    // onClick={() => submitComment()}
                  >
                    Post
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </dialog>
      
    </div>
  );
};

export default PostComponent;
