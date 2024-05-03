import React, { useEffect } from "react";
import { useContext, useState } from "react";
import Clintcontex from "../userContext/ClientContext";
import axios from "axios";
import { Link } from "react-router-dom";

const UserNotification = ({ isOpen, setIsOpen }) => {
  console.log(isOpen);
  const [getLikes, setGetLikes] = useState([]);
  const [getFollowers, setgetFollowers] = useState([]);
  const { userData } = useContext(Clintcontex);

  // console.log(userData);

  // const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const res = await axios.get("http://localhost:3003/user/notification", {
          params: { id: userData._id },
        });

        console.log(res.data);

        setgetFollowers(res.data.followers);
        setGetLikes(res.data?.post);
       
      } catch (err) {
        console.log("");
      }
    };
    getdata();
  }, [userData]);

  return (
    <div
      className={`fixed top-0 left-0 h-screen p-2 bg-white text-black transition-all duration-500 ease-in-out ${
        isOpen ? "w-[30%]" : "w-0"
      }`}
    >
      <h1 className="m-2 text-2xl font-bold overflow-hidden ">Notifications</h1>

      <hr className="border-black" />

      {/* <div>{ console.log(getFollowers) } </div> */}
      <div>{ console.log(getLikes) } </div>
      
        {
          getFollowers.slice().reverse().map((item,index) => {
            return(
              <div className="w-full h-fit mt-3 overflow-hidden hover:bg-neutral-100 rounded-xl">
               <Link to={`/user/${item.username}`}>
                <div className="flex p-2 gap-5">
                <img src={item?.profileimage}
                className="size-10 rounded-full object-cover"/>
                <div>
                <p className="font-semibold">{item.username}</p>
                <p className="font-medium">started following you</p>
                </div>
                </div>
                </Link>
              </div>

            )
          })
        }

      {
          getLikes.slice().reverse().map((item,index) => {
            return(
              
              <div key={index} className="w-full h-fit mt-3 overflow-hidden hover:bg-neutral-100 rounded-xl">
                <div className="flex p-2">
                  {item.like.map((like,index) =>(
                   <div key={index} className="w-fit flex-wrap mr-1">
                    
                    <p className="text-sm">{like.username}</p>
                    </div>
                  )
                )}
              
                <p className="font-semibold">liked your post</p>
                <img src={item?.imgUrl}  className="size-10 rounded-full object-cover ml-1" />
                </div>
              </div>

            )
          })
        }


      
    </div>
  );
};

export default UserNotification;
