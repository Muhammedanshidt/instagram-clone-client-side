import React, { useContext, useEffect, useRef, useState } from "react";
import Clintcontex from "../../userContext/ClientContext";
import MessageUser from "./MessageUser";
import Conversation from "./Conversation";
import ConversationNull from "./ConversationNull";
import axios from "axios";
import { HiOutlineEmojiHappy } from "react-icons/hi";
import { io } from "socket.io-client";
import { create } from "lodash";

function Messanger() {
  const { userData } = useContext(Clintcontex);

  const [messageUser, setMerssageUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [currentMessages, setCurrentMerssages] = useState(null);
  const [messagedUser, setMessagedUser] = useState();
  const [arrivalMessage,setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef(null);

  const userId = userData._id;

  // socket io

  useEffect(() => {
    socket.current = io("ws://localhost:3333");
    socket.current.on("getMessage",data => {
      setArrivalMessage({
        sender:data.senderId,
        text:data.text,
        createdAt:Date.now(),
      })
    })
  }, []);

  useEffect(() => {
    arrivalMessage && currentMessages?.members.includes(arrivalMessage.sender)&&
    setMessages((prev) => [...prev,arrivalMessage]);
  },[arrivalMessage,currentMessages])

  useEffect(() => {
    socket.current.emit("sendUser", userId);
    socket.current.on("getUsers", (users) => {
      console.log(users);
    });
  }, [userData]);

  console.log(userId);
  useEffect(() => {
    const getMessageUser = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3003/message/getroom/" + userId
        );
        console.log(res.data);
        setMerssageUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getMessageUser();
  }, [userData._id]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3003/message/getmessage/" + currentMessages?._id
        );

        setMessagedUser(
          res.data[0].conversationId?.members.find(
            (m) => m._id !== userData._id
          )
        );

        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getConversations();
  }, [currentMessages]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const textRef = React.useRef(null);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const messageValue = textRef.current.value;

    const message = {
      conversationId: currentMessages._id,
      sender: userData._id,
      text: messageValue,
    };

    if (messageValue == 0) {
      alert("no value");
    } else {
      textRef.current.value = "";
    }

    const receiverId = currentMessages.members.find(
      (member) => member !== userId
    );

    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: messageValue,
    });

    try {
      const res = await axios.post( 
        "http://localhost:3003/message/createmessage",
        { message: message }
      );
      setMessages([...messages, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="flex-[3]  w-full">
        <div className="px-5 py-3  h-[10%] ">
          <h1 className="text-xl font-bold">{userData?.username}</h1>
        </div>
        <div className=" h-[90%] overflow-auto" id="scrollTabHide">
          <h1 className="text-lg font-bold px-5 pt-3">Messages</h1>
          <div className="mt-2 ml-3">
            {messageUser.map((user) => (
              <div onClick={() => setCurrentMerssages(user)}>
                <MessageUser messageProp={user} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-[6] border-l-[1px] ">
        <div
          className={` flex gap-3 border-b-[1px] h-[13%] p-2 ${
            currentMessages ? "block" : "hidden"
          } `}
        >
          <img
            src={messagedUser?.profileimage}
            className="size-16 rounded-full object-cover"
          />
          <p className="text-lg font-semibold mt-3">{messagedUser?.username}</p>
        </div>

        {currentMessages ? (
          <div className="px-3  w-full h-[73%] overflow-auto">
            {messages.map((m) => (
              <div ref={scrollRef}>
                <Conversation message={m} own={m?.sender === userData._id} />
              </div>
            ))}
          </div>
        ) : (
          <ConversationNull />
        )}

        <div
          className={`w-full  h-[10%] ${currentMessages ? "block" : "hidden"}`}
        >
          <div className="p-5 relative">
            <input
              className="w-[100%] text-xl ml-4 p-2 pl-11 h-10 rounded-full border-gray-300 border-[1px] outline-none placeholder:text-sm placeholder"
              ref={textRef}
              placeholder=" Message..."
            />
            <div className="absolute top-[25px] right-10">
              <p
                className="text-blue-600 font-semibold hover:text-black cursor-pointer"
                onClick={handleSumbit}
              >
                send
              </p>
            </div>
            <HiOutlineEmojiHappy className="absolute top-7 size-7 left-12" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messanger;
