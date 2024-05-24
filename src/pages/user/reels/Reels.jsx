import React, { useContext, useEffect, useState, useRef } from "react";
import { FaPlay, FaPause } from "react-icons/fa";
import ClientContext from "../../userContext/ClientContext";
import axios from "axios";
import toast from "react-hot-toast";

const Reels = () => {
  const { userData } = useContext(ClientContext);
  const [post, setPost] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const videoRefs = useRef([]);

  useEffect(() => {
    if (userData) {
      const getExplorePost = async () => {
        try {
          const response = await axios.get(
            "getreels"
          );

          console.log(response.data);

          setPost(response.data);
        } catch (error) {
          console.log(error);
        }
      };

      getExplorePost();
    } else {
      toast.error("Please Login First");
    }
  }, [userData]);

  const handleVideoPlay = (index) => {
    if (currentVideoIndex !== null && currentVideoIndex !== index) {
      videoRefs.current[currentVideoIndex].pause();
    }
    videoRefs.current[index].play();

    setCurrentVideoIndex(index);
  };

  // const handleVideoPause = (index) => {
  //   videoRefs.current[index].pause();
  // };

  return (
    <div className="h-screen overflow-y-scroll snap-y snap-mandatory">
      <div className="w-[450px] h-full p-5 flex flex-col justify-center items-center relative"></div>
      {post.map((item, index) => (
        <div
          key={index}
          className="w-full h-screen snap-start flex justify-center items-center relative"
        >
          <div className="h-[calc(100%-50px)] w-fit bg-black flex justify-center items-center relative ">
            <video
              ref={(el) => (videoRefs.current[index] = el)}
              src={item.imgUrl}
              className="max-w-80 h-[calc(100%-50px)]"
              loop
              autoPlay
              onClick={() => handleVideoPlay(index)}
            />

            <div className="absolute bottom-10 left-5">
              <div className="flex gap-3 text-white">
                <img
                  src={item.userId.profileimage}
                  className="size-8 rounded-full object-cover"
                />
                <p className="font-medium">{item.userId.username}</p>
              </div>
              <p className=" text-white font-medium ml-10">
                {item.caption}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reels;

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

