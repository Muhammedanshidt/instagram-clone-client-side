// import React, { useContext, useState, useEffect } from "react";
// import Clintcontex from "../../userContext/ClientContext";
// import axios from "axios";

// function MessageUser({ messageProp }) {
//   console.log(messageProp);

//   const { userData } = useContext(Clintcontex);

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const friendId = messageProp.members.find((m) => m !== userData._id);
//     console.log(friendId);
//     console.log(userData._id);

//     const getUser = async () => {
//       try {
//       const res = await axios.get(
//         `http://localhost:3003/user/findUserId/${friendId}`
//       );
//      setUser(res.data);
//     }catch(err){
//       console.log(err);
//     }
//     };
    
//     getUser();
//   }, [messageProp,userData]);

//   const [useres, setUseres] = useState([]);



//   return (
//     <div>
//       <div className="flex gap-5 w-full hover:bg-slate-200 p-2">
//         <img
//           src={user?.profileimage? user.profileimage : "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.kindpng.com%2Fimgv%2FixJomm_no-avatar-png-circle-transparent-png%2F&psig=AOvVaw0AVXl4DKCMNfnniDXvweoZ&ust=1715260590795000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPinxOSR_oUDFQAAAAAdAAAAABAE"}
//           className="size-14 object-cover rounded-full"
//         />

//         <span className="text-base font-semibold mt-2">
//           {user?.username}
//         </span>
//       </div>
//     </div>
//   );
// }

// export default MessageUser;
