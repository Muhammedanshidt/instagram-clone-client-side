// import React, { useContext } from "react";
// import Clintcontex from "../../userContext/ClientContext";
// import TimeAgo from "javascript-time-ago";
// import en from "javascript-time-ago/locale/en";

// function Conversation({ message, own }) {
//   const { userData } = useContext(Clintcontex);

//   // const [sender,setSender]=


//   TimeAgo.addLocale(en);
//   const timeAgo = new TimeAgo("en-US");
//   return (
//     <>
//       <div className={` flex ${own && "justify-end"}`}>
//         <div
//           className={`p-3 my-2 mx-1 rounded-2xl  max-w-fit ${
//             own ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
//           }`}
//         >
//           {message.text}
//         </div>
//       </div>
//       <div className={` flex ${own && "justify-end"}`}>
        
//         <p className="text-xs text-gray-600 bottom-3 left-2 mt-1 relative" >{timeAgo.format(new Date(message.createdAt))}</p>
//       </div>
//     </>
//   );
// }

// export default Conversation;
