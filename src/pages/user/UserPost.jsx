
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Clintcontex from "../userContext/ClientContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { constant } from "lodash";
import { values } from "lodash";
// import bcrypt from 'bcryptjs'
import { MdMoreHoriz } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { RiImageEditFill } from "react-icons/ri";
import toast from "react-hot-toast";

function UserPost() {
  const { userData } = useContext(Clintcontex);

  // console.log(userData);

  const [post, setPost] = useState([]);
  // const [hashId,setHashId]=useState("");
  const [selectedPost, setSelectedPost] = useState([]);
  const [like, setLike] = useState(false);
  const [commentedUser, setCommentedUser] = useState([]);
  const [commentedPost, setCommentedPost] = useState([]);
  const [mapComment, setMapComment] = useState([]);
  // const [openPostId,setOpenPostId] = useState("")
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  // useEffect(() => {
  //   getAllPost();
  // }, []);

  //
  useEffect(() => {
    const shoPost = async () => {
      if (userData) {
        try {
          const response = await axios.get(
            "getOwnPost",
            {
              params: { Id: userData._id },
            }
          );
          const { post } = response.data;
          console.log(post);
          setPost(post);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
        // console.log(data.postData);
        // setMapComment(data.postData)
      }
    };
    shoPost();
  }, [userData]);

  const openModal = (item) => {
    setSelectedPost(item);
    // item.like.include(userId) ? setLike(true):setLike(false)
    setLike(item.like.includes(userData._id));
    document.getElementById("postModal").showModal();
    console.log(selectedPost, "onselect post");
  };

  const deletePost = async (id) => {
    console.log(id, "delete button clicked");
    const userId = userData._id;
    const postId = id;
    try {
      if (postId && userId) {
        console.log(id);
        const res = await axios.delete(
          `postDelete/${userId}/${postId}`
        );
        res.data.successful
          ? toast.success(res.data.successful)
          : toast.error();
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const likeHandler = async () => {
    try {
      if (selectedPost) {
        const response = await axios.post(
          "userLike",
          { ownerId: userData._id, postId: selectedPost._id }
        );
        setLike(!like);
        console.log("after axios");
        const data = response.data;

        console.log(data, "this is the responce from server");
      }
    } catch (error) {
      console.log("iede", error);
    }
  };

  const [commentValue, setCommentValue] = useState("");

  const inputRef = React.useRef(null);

  const submitComment = async () => {
    console.log("hello");
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
          postId: selectedPost._id,
          commentvalue: commentValue,
        });

        const { data } = res;
        const { user, post } = data;

        if (user && post) {
          setCommentedUser(user);
          setCommentedPost(post);
        }

        console.log(commentedUser);
        console.log(commentedPost);
        console.log(selectedPost.comments);
      }
    } catch (err) {
      console.log("error in submitting the comment ", err);
    }
  };

  // console.log(post, "nuuo");

  const textRef = React.useRef(null);

  const editCaption = async (Id) => {
    const userId = userData._id;

    console.log("hekk");

    const editTextValue = textRef.current.value;

    if (editTextValue == 0) {
      alert("no value");
    } else {
      textRef.current.value = "";
    }

    const res = await axios.put("editCaption", {
      text: editTextValue,
      userId: userId,
      postId: Id,
    });
    console.log(res.data);
  };

  return (
    <div>
      {post.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-6 mx-6 w-[97%] p-1">
          {post?.map((item, index) => {
            return (
              <div key={index} className="cursor-pointer w-fit h-fit">
                <Link to={`/profile?id=${item?._id}`}>
                  <img
                    className="h-60 w-[350px] rounded-lg"
                    src={item?.imgUrl}
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

      <dialog id="postModal" className="modal ">
        {console.log(selectedPost)}
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex w-[750px] h-[450px]">
            {post && (
              <div className="h-full w-full flex justify-center items-center">
                <img
                  src={selectedPost?.imgUrl}
                  alt={selectedPost?.caption}
                  className="h-full w-fit "
                />
              </div>
            )}
            <div className="h-full w-full bg-white border-l-2 border-gray-200">
              <div className="flex p-2 bg-white">
                <img
                  src={userData?.profileimage}
                  className="size-10 object-cover rounded-full"
                />
                <p className="p-2 font-semibold">{userData?.username}</p>
              </div>
              <div
                className="w-fit h-fit relative left-[290px] bottom-12 "
                onClick={() => setOpenDelete((prevOpen) => !prevOpen)}
              >
                <MdMoreHoriz className="text-3xl" />
                <div
                  className={`w-fit h-fit px-3 py-1 absolute right-4 top-3 bg-slate-200 opacity-80 rounded-lg z-40 ${
                    openDelete ? "block" : "hidden"
                  }`}
                >
                  <ul className="p-1">
                    {console.log(openDelete)}
                    <div className="flex w-full hover:bg-red-600 hover:text-white hover:font-semibold cursor-pointer px-2 mt-1 rounded-sm">
                      <MdDelete className="mt-1 mr-3 text-lg" />
                      <li onClick={() => deletePost(selectedPost._id)}>
                        {" "}
                        <span>Delete</span>
                      </li>
                    </div>
                    <div className="flex w-full hover:bg-slate-600  hover:text-white cursor-pointer px-2 mt-1 rounded-sm">
                      <MdCancel className="mt-1 mr-3 text-lg" />
                      <li>Cancel</li>
                    </div>
                    <div
                      className=" flex w-full hover:bg-blue-600  hover:text-white cursor-pointer px-2 mt-1 rounded-sm"
                      onClick={() =>
                        document.getElementById("editPost").showModal()
                      }
                    >
                      <RiImageEditFill className="mt-1 mr-3 text-lg" />
                      <li>Edit</li>
                    </div>
                  </ul>
                </div>
              </div>
              <dialog id="editPost" className="modal rounded-3xl shadow-2xl">
                <div className="modal-box ">
                  <div className="w-[500px] h-fit">
                    <div className="w-full h-fit flex justify-between">
                      <form method="dialog">
                        <button className="btn btn-sm text-xl font-bold  btn-circle btn-ghost  p-2">
                          ✕
                        </button>
                      </form>

                      <h3 className="font-bold mt-3 w-fit ">Edit info</h3>
                      <div
                        className=" w-fit h-fit p-2 mt-1 font-semibold text-blue-600 hover:text-black cursor-pointer"
                        onClick={() => editCaption(selectedPost._id)}
                      >
                        Done
                      </div>
                    </div>
                    <hr className=" border-black" />
                    <div className=" h-fit w-full flex">
                      <div className="bg-slate-500 w-[50%] h-[50%] ">
                        <img src={selectedPost.imgUrl} className="h-fit" />
                      </div>
                      <div>
                        <textarea
                          className="outline-none p-1"
                          cols="30"
                          rows="10"
                          ref={textRef}
                          placeholder="edit your image caption ..."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </dialog>
              <hr />
              <div className="h-56 w-full bg-white ">
                {selectedPost?.caption ? (
                  <div className="flex px-2 py-1 gap-3 bg-slate-100 w-full h-fit relative bottom-6">
                    <img
                      src={userData?.profileimage}
                      className="size-6  object-cover rounded-full"
                    />
                    <p>{selectedPost?.caption}</p>
                    {/* <hr /> */}
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
                  {/* {console.log(selectedPost,"before like")} */}
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
      </dialog>
    </div>
  );
}

export default UserPost;
