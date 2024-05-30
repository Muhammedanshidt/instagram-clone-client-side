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
  const [save, setSave] = useState(false);

  useEffect(() => {
    const shoPost = async () => {
      try {
        const response = await axios.get("grtPostModal", {
          params: { currentPost: id },
        });

        const posts = response.data.post;
        const like = response.data.likes;

        setPost(posts);
        setMapComment(posts.comments);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    shoPost();
  }, [userData, commentedPost, currentComment]);

  const likeHandler = async (item) => {
    try {
      if (item) {
        const response = await axios.post("userLike", {
          ownerId: userData._id,
          postId: item._id,
        });
        setLike(!like);
        const data = response.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const inputRef = React.useRef(null);

  const submitComment = async () => {
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

        const { postData } = res.data;

        if (postData) {
          
          setCommentedPost(postData);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const openModal = () => {
    document.getElementById("editComment").showModal();
  };

  const [commentId, setCommentId] = useState();
  const [postId, setPostId] = useState();

  const editCommentHandle = (comment) => {
    const check = userData.comments.includes(comment._id);

    if (check) {
      setOpenDelete((prevOpen) => !prevOpen);
      setCommentId(comment._id);
      setPostId(comment.postId?._id);
    }
  };

  const deleteComment = async () => {
    const check = userData.comments.includes(commentId);

    const userId = userData._id;

    if (check) {
      const res = await axios.delete(
        `commentDelete/${userId}/${commentId}/${postId}`
      );
      setCurrentComment("");
    }
  };

  const savePostHandle = async (postId) => {
    const res = await axios.post(`savepost/${userData._id}/${postId}`);

    setSave(!save);
  };

  const [text, setText] = useState();

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const editComment = async () => {
    const res = await axios.put("editComment", {
      editedComment: text,
      postId: postId,
      commentId: commentId,
    });
    setCurrentComment("");
  };
  return (
    <div>
      <dialog id={myProp}>
        <div className="modal-box">
          <form method="dialog">
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
                  {mapComment
                    .slice()
                    .reverse()

                    .map((comment, index) => {
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
                                    onClick={() => editCommentHandle(comment)}
                                  />
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
                                  <div
                                    className="flex w-full  hover:text-red-700  hover:font-semibold cursor-pointer px-2 mt-1 rounded-sm"
                                    onClick={() => deleteComment()}
                                  >
                                    <MdDelete className="mt-1 mr-3 " />
                                    <li>
                                      <span>Delete</span>
                                    </li>
                                  </div>
                                  <div className="flex w-full  hover:text-green-700 hover:font-medium cursor-pointer px-2 mt-1 rounded-sm">
                                    <MdCancel className="mt-1 mr-3 text-lg" />
                                    <li>Cancel</li>
                                  </div>
                                  <div
                                    className=" flex w-full hover:text-blue-700  cursor-pointer px-2 mt-1 rounded-sm"
                                    onClick={() => {
                                      document
                                        .getElementById("editComment")
                                        .showModal();
                                    }}
                                  >
                                    <RiImageEditFill className="mt-1 mr-3 text-lg" />
                                    <li>Edit</li>
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
                                document.getElementById("editComment").close();
                              }}
                            >
                              Cancel
                            </div>
                            <div
                              className="hover:text-blue-600 p-1 cursor-pointer"
                              onClick={editComment}
                            >
                              Done
                            </div>
                          </div>
                          <textarea
                            className="outline-double p-1"
                            cols="30"
                            rows="3"
                            onChange={(e) => handleChange(e)}
                            placeholder="edit your image caption ..."
                          ></textarea>
                        </div>
                      </div>
                    </div>
                  </dialog>
                  <hr />
                </div>
              </div>

              <div className="text-xs h-fit border-t-2 mt-8 flex justify-between">
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
                  <p className="text-sm px-1">{`liked by ${post.like?.length} user`}</p>
                </div>
                <div
                  onClick={() => {
                    savePostHandle(post._id);
                  }}
                >
                  {post.saveBy?.includes(userData._id) ? (
                    <p className=" font-medium flex text-sm cursor-pointer mr-3 mt-[2px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        viewBox="0 0 24 24"
                        fill="black"
                      >
                        <path d="M 4 2 L 4 22 L 12 19 L 20 22 L 20 2 L 6 2 L 4 2 z"></path>
                      </svg>{" "}
                    </p>
                  ) : (
                    <p className=" font-medium flex text-sm cursor-pointer mr-3 mt-[2px]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path d="M 4 2 L 4 22 L 12 19 L 20 22 L 20 2 L 6 2 L 4 2 z"></path>
                      </svg>{" "}
                    </p>
                  )}
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
