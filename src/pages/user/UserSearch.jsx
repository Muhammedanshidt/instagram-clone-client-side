import axios from "axios";
import React, { useState } from "react";
import { MdClear } from "react-icons/md";
import { Link } from "react-router-dom";

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState([]);
  const [resData,setResData] = useState([])

  const onchangeInput =async (e) => {
    
    const  value = e.target.value;

    console.log(value);
  
    try{

    const res =  await axios.get("userSearch",{
      params: {
        userName : value
      }
    })
    const  data = res.data;

    setSearchTerm(value);
    setResData(data);
    console.log(data);
  }
  catch(err){
    alert('Error')
    console.error(`An error occurred: ${err}`);
  }
  };

  const inputRef = React.useRef(null);

  const clearInput = () => {
    inputRef.current.value = "";
    setSearchTerm([]);
  };

  return (
    <div className="ml-5 h-screen border-r ">
      <div className="w-fit h-fit bg-white duration-1000 p-2">
        <h4 className=" text-2xl font-semibold">Search</h4>
        <form action="">
          <input
            className="w-80 h-10 mt-8 p-2 rounded-lg  bg-[#EFEFEF] outline-none placeholder:px-2 placeholder:font-thin"
            placeholder="Search"
            onChange={(e) => onchangeInput (e)}
            ref={inputRef}
          />
          <MdClear
            className="absolute top-[85px] left-[550px] size-[14px] bg-zinc-300 text-white rounded-xl p-[1px] cursor-pointer"
            onClick={() => clearInput()}
          />
        </form>
        <hr className="mt-7" />
      </div>

      <p className="text-base font-semibold p-3">Recent</p>

      <div className=" w-full h-fit p-3 border mr-3">
      {
  resData
    ? resData
        .filter((item) => searchTerm === item.username)
        .map((item, index) => (
          <Link to={`/user/${item.username}`} key={index}>
            <div className="flex gap-4">
              <img src={item.profileimage} className="w-10 h-10 rounded-full" />
              <h1>{item.username}</h1>
            </div>
          </Link>
        ))
    : null
}


      </div>
    </div>
  );
};

export default UserSearch;
