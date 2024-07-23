import React, { useContext, useEffect, useState } from "react";
import Clintcontex from "../userContext/ClientContext";
import axios from "axios";

import toast from "react-hot-toast";



import { Link } from "react-router-dom";
import PostCard from "./PostCard";

const Home = () => {
  const { userData, setModalOpen } = useContext(Clintcontex);

  const [signUser, setSignUser] = useState([]);
  const [post, setPost] = useState([]);
  const [like, setLike] = useState(false);


  useEffect(() => {
    const getUser = async () => {
      if (userData._id !== null) {
        try {
          const response = await axios.get(
            "getuser"
          );
        
          setSignUser(response.data);

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


        } catch (error) {

        }
      };
      getExplorePost();
    } else {
      toast.error("Please Login First");
    }
  }, [userData]);

  

  const likeHandler = async (postId) => {
    
    setLike(!like);

    try {
      if (postId) {
        const response = await axios.post(
          "userLike",
          { ownerId: userData._id, postId: postId }
        );

        const data = response.data;

        console.log(data, "this is the responce from server");
      }
    } catch (error) {

    }
  };

  return (
    <div className="flex max-sm:flex max-sm:justify-center max-sm:items-center " id="scrollTabHide">
    

      <div className="w-full object-cover ">
        {post.length > 0 ? (
          post.map((item, index) => (
            <PostCard {...{item,likeHandler,like}} key={index} />
           
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      {/* user show profile side */}

      <div className="hidden md:block fixed  right-20 h-screen" id="scrollTabHide">
        {/* <button className='bg-rose-600 w-fit h-fit mx-10 my-10' onClick={getUser}>show</button>  */}
        <div className=" w-full h-[500px] p-10 border-black ">
          {signUser.map((item) => (
            <div className="border p-10 rounded-full flex justify-center w-full m-2 py-2 hover:bg-blue-100 overflow-hidden">
              <Link to={`/user/${item.username}`}>
                <div className="flex">
                  <img
                    src={
                      item?.profileimage ||
                      "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_640.png"
                    }
                    className="w-16 rounded-full h-16 border-[1px] border-black object-cover"
                    alt="image"
                  />
                  <p className="my-3 mx-3 font-semibold ">{item.username}</p>
                </div>
              </Link>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
