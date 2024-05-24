import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Clintcontex from "../userContext/ClientContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import InputEmoji from "react-input-emoji";
import { MdMoreHoriz } from "react-icons/md";
import { formatDistanceToNow } from "date-fns";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { RiImageEditFill } from "react-icons/ri";
import toast from "react-hot-toast";


const PostComponent = ({ myProp }) => {
  const { userData } = useContext(Clintcontex);

  const [id, setId] = useState(myProp);
  console.log("myProp:", myProp);
  const [post, setPost] = useState([]);
  const [selectedPost, setSelectedPost] = useState([]);
  const [like, setLike] = useState(false);
  const [commentedUser, setCommentedUser] = useState([]);
  const [commentedPost, setCommentedPost] = useState([]);
  const [mapComment, setMapComment] = useState([]);
  const [currentComment, setCurrentComment] = useState("");
  const [currentPost, setCurrentPost] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const { modalOpen, setModalOpen } = useContext(Clintcontex);

  console.log("this is postcomponent");
  console.log(myProp, "passing to com");


  useEffect(() => {
    //     if (modalOpen && currentPost) {
    //   document.getElementById(currentPost).showModal();
    // }

    const shoPost = async () => {
      // console.log("before pass", myProp);

      try {
        const response = await axios.get(
          "grtPostModal",
          {
            params: { currentPost: id },
          }
        );

        const posts = response.data.post;
        const like = response.data.likes;

        setPost(posts);
        setMapComment(posts.comments);
      
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    shoPost();
  }, [userData, commentedPost, currentComment, ]);


  const likeHandler = async (item) => {
    console.log(item, "item");
    try {
      if (item) {
        const response = await axios.post(
          "userLike",
          { ownerId: userData._id, postId: item._id }
        );
        setLike(!like);
        // console.log("after axios");
        const data = response.data;

        console.log(data, "this is the responce from server");
      }
    } catch (error) {
      console.log( error);
    }
  };

  const inputRef = React.useRef(null);

  const submitComment = async () => {
    console.log("hello");
    console.log(post._id);
    try {
      const commentValue = inputRef.current.value;

      if (commentValue == 0) {
        alert("no value");
      } else {
        if (inputRef.current) {
          inputRef.current.value = "";
        }

        const res = await axios.post("userComment", {
          ownerId: userData._id,
          postId: post._id,
          commentvalue: commentValue,
        });

        console.log(res);

        const { postData } = res.data;

        console.log(postData, "hihihichdsnckdncksnc");
        console.log(postData.userId);

        if (postData) {
          // setCommentedUser(user);
          setCommentedPost(postData);
        }

        // console.log(commentedUser);
        // console.log(commentedPost);
        // console.log(selectedPost.comments);
      }
    } catch (err) {
      console.log("error in submitting the comment ", err);
    }
  };

  const openModal = () => {
    document.getElementById("editComment").showModal();
  };

  const [commentId,setCommentId] = useState ()
  const [postId,setPostId] = useState ()

  const editCommentHandle = (comment) => {

    // console.log(comment.postId._id);

    // console.log(comment.postId._id, "iam muhammed anshid");
    // console.log(comment._id);
    // console.log(comment);
    console.log(userData.comments);


    const check = userData.comments.includes(comment._id)

    console.log(check);
    if (check) {
  setOpenDelete((prevOpen) => !prevOpen)
  setCommentId(comment._id)
  setPostId(comment.postId?._id)
  // console.log(postId._id);
    }
  };

  const deleteComment = async () => {
   
    console.log(commentId,"delete comment");
    console.log(userData.comments);



    const check = userData.comments.includes(commentId)

    console.log(check);

    const userId = userData._id


    if (check) {

      const res = await axios.delete(`commentDelete/${userId}/${commentId}/${postId}`)
      res.data.successful
          ?
    setCurrentComment("")
    
          : toast.error();
    }
    
  }

  // const commentRef = React.useRef(null);

  const [text, setText] = useState();

  
  const handleChange = (event) => {
    setText(event.target.value);
    // console.log(text);
  };

  const editComment = async () => {

    console.log(text);

    const res = await axios.put("editComment",{
      editedComment:text,
      postId:postId,
      commentId:commentId
    })
setCurrentComment("")
    console.log(res.data.data)

  }
  return (
    <div>
      <dialog id={myProp}>
        {console.log(post, "uioguiguiotfghkluio")}
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              //  onClick={setCurrentPost("")}
            >
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
                    .slice()
                    .reverse()
                    // ?.filter((comment) => comment.postId === post?._id)
                    .map((comment, index) => {
                      // console.log(comment, "map comment");
                      return (
                        <div className=" w-full h-fit mt-2" key={index}>
                          <div className="flex gap-2 p-1 ">
                            <img
                              src={comment?.userId?.profileimage}
                              className="size-8  object-cover rounded-full"
                            />
                            <div className="overflow-hidden gap-2 w-full ">
                              <div className="flex gap-2">
                                <p className="text-base font-semibold">
                                  {comment?.userId?.username}
                                </p>
                                <p className="text-xs mt-1">
                                  {" "}
                                  {formatDistanceToNow(
                                    new Date(comment.createdAt)
                                  )}{" "}
                                  ago
                                </p>
                                <div>
                                  <MdMoreHoriz
                                    onClick={
                                      () => editCommentHandle(comment)

                                    }
                                  />
                                  {/* {console.log(comment,"delete map")} */}
                                </div>
                              </div>
                              <div className=" w-[80%] overflow-auto">
                                <span>{comment?.text}</span>
                              </div>

                              <div
                                onClick={() =>
                                  setOpenDelete((prevOpen) => !prevOpen)
                                }
                                className={`w-fit h-fit px-8 py-4 absolute right-32 top-40 bg-slate-200 opacity-80 rounded-lg z-40 ${
                                  openDelete ? "block" : "hidden"
                                }`}
                              >
                                <ul className="p-1">
                                  {/* {console.log(openDelete)} */}
                                  <div className="flex w-full  hover:text-red-700  hover:font-semibold cursor-pointer px-2 mt-1 rounded-sm"
                                         onClick={
                                          () => deleteComment()
                                        }
                                  >
                                    <MdDelete className="mt-1 mr-3 " />
                                    <li>
                                      <span>Delete</span>
                                      {/* {console.log(comment?.text, "delete")} */}
                                    </li>
                                  </div>
                                  <div className="flex w-full  hover:text-green-700 hover:font-medium cursor-pointer px-2 mt-1 rounded-sm">
                                    <MdCancel className="mt-1 mr-3 text-lg" />
                                    <li>Cancel</li>
                                  </div>
                                  <div
                                    className=" flex w-full hover:text-blue-700  cursor-pointer px-2 mt-1 rounded-sm"
                                    onClick={() => {
                                      // setShowModal(true);
                                      // if (showModal) {
                                      document
                                        .getElementById("editComment")
                                        .showModal();
                                      // }
                                    }}
                                  >
                                    <RiImageEditFill className="mt-1 mr-3 text-lg" />
                                    <li>Edit</li>

                                    {/* {console.log(comment?.text)} */}
                                  </div>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                  <dialog
                    id="editComment"
                    className="modal rounded-3xl shadow-2xl"
                  >
                    <div className="modal-box ">
                      <div>
                        <div className="p-2 w-fit h-fit mb-4">
                          <div className="flex justify-between p-3 font-semibold">
                            <div
                              className="hover:text-red-600 p-1 cursor-pointer"
                              onClick={() => {
                                // setShowModal(false);
                                document.getElementById("editComment").close();
                              }}
                            >
                              Cancel
                            </div>
                            <div className="hover:text-blue-600 p-1 cursor-pointer"
                            onClick={editComment}>
                              Done
                            </div>
                          </div>
                          <textarea
                            className="outline-double p-1"
                            cols="30"
                            rows="3"
                            // value={text}
                            onChange={(e)=>handleChange(e)}
                            // ref={commentRef}
                                                      placeholder="edit your image caption ..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </dialog>
                  <hr />
                </div>
              </div>

              {/* <dialog id="editComment" className="modal rounded-3xl shadow-2xl">
                <div className="modal-box ">
                    <div>
                      <div className="p-3 bg-slate-600 w-fit h-fit">
                        <input
                        placeholder={selectedPost.username}
                        />
                      </div>
                    </div>
                </div>
              </dialog> */}

              <div className="text-xs h-fit border-t-2 mt-8">
                <div
                  className="h-fit w-fit cursor-pointer"
                  onClick={() => likeHandler(post._id)}
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
      </dialog>
    </div>
  );
};

export default PostComponent;
