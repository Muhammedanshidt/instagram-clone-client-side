import React, { useContext, useEffect, useState } from "react";
// import { PiDotsThreeBold } from "react-icons/pi";
import Clintcontex from "../userContext/ClientContext";
import axios from "axios";
// import { useSelect } from '@material-tailwind/react';
// import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import PostComponent from "./PostComponent";
import Profile from "../../asset/profile-circle.svg";


import { Link } from "react-router-dom";
import PostCard from "./PostCard";

const Home = () => {
  const { userData, setModalOpen } = useContext(Clintcontex);

  const [signUser, setSignUser] = useState([]);
  const [post, setPost] = useState([]);
  const [like, setLike] = useState(false);
  const [showComponent, setShowComponent] = useState(false);
  const [postId, setPostId] = useState();

  useEffect(() => {
    const getUser = async () => {
      if (userData._id !== null) {
        try {
          const response = await axios.get(
            "getuser"
          );
          console.log(response);
          setSignUser(response.data);
          //  console.log("Get User Data",response.data);
          //  console.log("", signUser)
          //  console.log(response.data);
          //  console.log(name);
        } catch (err) {
          console.log("Error", err);
        }
      } else {
        alert("Please Login First");
      }
    };
    getUser();
  }, [userData]);

  const iduser = userData._id;

  useEffect(() => {
    if (userData) {
      const getExplorePost = async () => {
        try {
          const response = await axios.get(
            "getExplorePost"
          );

          console.log(response.data);
          setPost(response.data);

          // console.log(typeof idusr);
          //  response.data.map(item => {

          //  console.log(item)
          // //  setLike(item.like.includes(userData._id.stringify()))
          // const bol = item.like.includes(iduser)
          //  setLike(bol);
          //  console.log(like);

          // });
        } catch (error) {
          console.log(error);
        }
      };
      getExplorePost();
    } else {
      toast.error("Please Login First");
    }
  }, [userData]);

  console.log(userData);

  
  // console.log(post,"ohigiuiguviy");

  const likeHandler = async (postId) => {
    console.log(postId);
    setLike(!like);

    try {
      if (postId) {
        const response = await axios.post(
          "userLike",
          { ownerId: userData._id, postId: postId }
        );
        console.log("after axios");
        const data = response.data;

        console.log(data, "this is the responce from server");
      }
    } catch (error) {
      console.log("iede", error);
    }
  };

  return (
    
    <div className="flex" id="scrollTabHide">
    

      <div className=" ml-14 w-[600px] object-cover ">
        {post.length > 0 ? (
          post.map((item, index) => (
            <PostCard {...{item,likeHandler,like}} key={index} />
           
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      {/* user show profile side */}

      <div className="w-fit fixed right-20 h-screen" id="scrollTabHide">
        {/* <button className='bg-rose-600 w-fit h-fit mx-10 my-10' onClick={getUser}>show</button>  */}
        <div className="w-full h-fit py-10 ">
          {signUser.map((item) => (
            <div className="border p-10 rounded-full flex justify-center w-full m-2 py-2 hover:bg-blue-100">
              <Link to={`/user/${item.username}`}>
                <div className="flex">
                  <img
                    src={
                      item?.profileimage ||
                      "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                    }
                    className="w-16 rounded-full h-16 border-[1px] border-black "
                    alt="image"
                  />
                  <p className="my-3 mx-3 font-semibold ">{item.username}</p>
                </div>
              </Link>
              {/* <button className='mx-auto my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded float-right h-fit' >Follow</button> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
