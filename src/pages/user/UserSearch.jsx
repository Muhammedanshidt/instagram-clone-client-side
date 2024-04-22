import axios from "axios";
import React from "react";
import { MdClear } from "react-icons/md";
const UserSearch = () => {
  const [searchTerm, setSearchTerm] = React.useState([]);

  const onchangeInput =async (e) => {
    
    const  value = e.target.value;
  
    try{

    const res =  await axios.get("http://localhost:3003/user/userSearch",{
      params: {
        userName : value
      }
    })
    const  data = res.data;
    setSearchTerm(data);
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
  searchTerm ?
  (
    <div className="flex gap-4">
    <img 
    src={searchTerm[0]?.profileimage}
    className="size-10 rounded-full"
    />
    <h1 className=" w-fit h-fit">{searchTerm[0]?.username }</h1>
    </div>
  )
   : null
}

      </div>
    </div>
  );
};

export default UserSearch;
