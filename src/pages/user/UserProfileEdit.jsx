import React, { useContext, useState } from "react";
import Profile from "../../asset/profile-circle.svg";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import Clintcontex from "../userContext/ClientContext";
import toast from "react-hot-toast";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router";

function UserProfileEdit() {
  const [valueCount, setValueCount] = useState(0);
  //const [img, setImg] = useState(null);
  // const [loading, setLoading] = useState(false);
  const [bio, setBio] = useState("");
  const [outPass, setOutPass] = useState("");
  const { userData } = useContext(Clintcontex);

  const navigate = useNavigate();

  // console.log(userData);

  // console.log(userData);

  // const clearCookie = (cookie) => {
  //   document.cookie =
  // }

  const apikey = "237691142669394";
  const cloudname = "dvxrfsr4e";

  const handlChange = async (e) => {
    const bioValue = e.target.value;
    setValueCount(bioValue.length);

    if (bioValue.length >= 101) {
      alert("100 is limit");
    }
    setBio(bioValue);
    try {
      const bioRes = await axios.post(
        "http://localhost:3003/user/profile/edit",
        {
          bio: bioValue,
          userData: userData,
        }
      );
      console.log(bioRes.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const logOutInput = (e) =>{
  //   const passwordOut = e.target.value
  //   setOutPass(passwordOut)
  // }

  //* image upload start here

  const [img, setImg] = useState(null);

  const presetimg = "user_profile_pic";

  const handleSubmit = async (e) => {
    if (!img) {
      toast.error("no image in input");
      return;
    }
    console.log("start");
    const imgfile = img[0];

    const formData = new FormData();
    formData.append("file", imgfile);
    formData.append("upload_preset", presetimg);
    formData.append("api_key", apikey);
    console.log("uploading");
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudname}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }
    toast.success("success full");

    console.log(data);

    const backendResponse = await axios.post(
      "http://localhost:3003/user/userProfileImage",
      {
        imageUrl: data.secure_url,
        email: userData.email,
      }
    );
  };

  const logOutDone = async () => {
    // const logOutPassword = outPass
    // console.log(logOutPassword);

    try {
      const logBack = await axios.post(
        "http://localhost:3003/user/logout",
        {},
        { withCredentials: true }
      );
      toast.success(logBack.data.message);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const [editUserName, setEditUserName] = useState("");
  const [editFullName, setEditFullName] = useState("");

  const changeName = (e) => {
    const value = e.target.value;
    setEditFullName(value);
  };
  const changeUserName = (e) => {
    const value = e.target.value;
    console.log(value);
    setEditUserName(value);
  };
  const editName = async (e) => {
    e.preventDefault();
    console.log(editUserName + " " + editFullName);
    console.log(userData.email);
    try {
      const res = await axios.post(
        "http://localhost:3003/user/editUser",
        {nameUser:editUserName,nameFull:editFullName,email:userData.email},
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" mx-36 mt-10 w-[600px] p-2">
      <div className="flex gap-96">
        <h1 className="text-xl font-bold"> Edit Profile </h1>
        <button
          className="bg-blue-500 px-2 py-1 text-lg rounded-full font-semibold text-white  hover:bg-red-500"
          onClick={() => document.getElementById("my_modal_logout").showModal()}
          // onClick={logOutButton}
        >
          Log Out
        </button>

        <dialog id="my_modal_logout" className="modal rounded-3xl">
          <div className="p-5 w-96 h- bg-slate-100 ">
            <div className="modal-box">
              <h3 className="font-semibold text-lg">Enter Your Password</h3>
              {/* <input className=' w-60 h-7' onChange={logOutInput}/> */}
            </div>
            <form method="dialog" className="modal-backdrop">
              <div className="flex justify-between">
                <button className="font-semibold text-red-500 text-lg mt-3">
                  close
                </button>
                <button
                  className="font-bold text-green-500 text-lg mt-3"
                  onClick={logOutDone}
                >
                  Done
                </button>
              </div>
            </form>
          </div>
        </dialog>
      </div>
      <div className="bg-gray-100 mt-12 border rounded-2xl flex">
        <div className="flex">
          <img className=" mx-3 size-20" src={Profile} alt="profile" />
          <div className="mt-3">
            <h1 className="font-bold">{userData.username}</h1>
            <h1 className="text-gray-400 ">{userData.fullname}</h1>
          </div>
        </div>
        <div className="mt-7 ml-60 gap-8">
          <label className="bg-blue-400 hover:bg-blue-600 text-white text-sm font-semibold rounded-md py-2 px-2 cursor-pointer w-fit">
            Change photo
            <input
              type="file"
              className="hidden"
              onChange={(e) => setImg(e.target.files)}
              // accept="image/*"
            />
          </label>
        </div>
       
      </div>
      
      {img && (
        <div className="relative align-top top-5 border rounded-xl bottom-0 w-[80%] bg-slate-200 shadow-slate-300 shadow-2xl p-3 h-fit m-auto z-10">
          <div className="my-[3%] flex  gap-32">
            <h2 className="text-lg text-gray-700 ">
              Are you sure to change the photo ?
            </h2>
            <RxCross2
              className="size-5 relative bottom-5 cursor-pointer"
              onClick={() => setImg(null)}
            />
          </div>
          <div
            onClick={(e) => handleSubmit(e)}
            className="cursor-pointer px-4 py-1 hover:bg-blue-600 bg-blue-300 rounded-md text-white font-medium w-fit"
          >
            Yes
          </div>
        </div>
      )}
      <div className="my-10">
        <h1 className="my-3 mx-3 text-lg font-semibold">Bio</h1>
        <div className="relative">
          <textarea
            placeholder="Bio"
            autoFocus
            maxLength={100}
            onChange={handlChange}
            className=" placeholder-gray-500 placeholder-opacity-70 p-1 font-semibold textarea textarea-bordered textarea-md w-[580px] h-20 border-2 rounded-2xl"
          ></textarea>
          <p className="absolute bottom-[10px] right-[10px] ">
            {valueCount}/100
          </p>
        </div>
      </div>

      <div className="mx-56">
        <button
          className="bg-blue-500 hover:bg-cyan-400 text-white p-2 rounded-xl"
          onClick={() => document.getElementById("my_modal_3_edit").showModal()}
        >
          personal deatils
        </button>
      </div>

      <dialog id="my_modal_3_edit" className="modal rounded-3xl shadow-2xl">
        <div className="modal-box ">
          <form method="dialog">
            <button className="btn btn-sm text-xl font-bold  btn-circle btn-ghost absolute right-2 top-2 p-2">
              ✕
            </button>
          </form>
          <div className="bg-white p-6 h-96 ">
            <h3 className="font-bold text-lg text-center m-5 w-64 ">
              Edit Personal Deatails
            </h3>
            <hr className=" border-black my-4" />

            <label className="font-semibold text-lg mt-2"> Name</label>
            <br />
            <input type="text" className="border mt-2 bg-slate-100 w-72 h-8"  onChange={(e) => changeName(e)} />
            <br />
            <label className='font-semibold text-lg mt-2"'>
              Username
              <br />
              <input
                type="text"
                className="border mt-2 bg-slate-100 w-72 h-8"
                onChange={(e) => changeUserName(e)}
              />
            </label>
            <br />

            <button className="bg-blue-500 hover:bg-cyan-500 rounded-3xl mx-24 my-10 text-white text-lg font-semibold px-2 py-1 w-24" onClick={editName}>
              Avatar
            </button>
          </div>
        </div>
      </dialog>

      {/* { loading && <Spinner color="blue" /> } */}
    </div>
  );
}

export default UserProfileEdit;
