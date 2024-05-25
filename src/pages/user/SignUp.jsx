import React, { useState, useContext } from "react";
import TitleImage from "../../asset/title.png";
import PlayStore from "../../asset/playstore.png";
import Microsoft from "../../asset/microsoft.png";
import "./SignUp.css";
import { useNavigate } from "react-router";
import Clintcontex from "../userContext/ClientContext";
import axios from "axios";
import toast from "react-hot-toast";

function SignUp() {
  const initialFormData = {
    email: "",
    fullname: "",
    username: "",
    password: "",
  };

  const { userData, setUserData } = useContext(Clintcontex);
  

  const [formFillData, setFormFillData] = useState(initialFormData);
  const [errorMessage, setErrorMessage] = useState({});

  const routeNavigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFillData({
      ...formFillData,
      [name]: value,
    });
  };

  const saveUser = async () => {
    console.log("save user");
    

    try {
      const response = await axios.post("signup", formFillData);
      console.log("haimonu")

      if (response.data) {
        // console.log(formFillData);
        setUserData(formFillData);
        // console.log(userData);
        routeNavigate("/otp");
      }
    } catch (error) {
      toast.error(error);
      // console.log(error);
    }
  };

  const sumbitForm = (event) => {
    event.preventDefault();
    // console.log("submitted");
    
    const formError = {};

    if (formFillData.email === "") {
      formError.email = "Email is required.";
    }
    if (formFillData.fullname === "") {
      formError.fullname = "Full name is required.";
    }
    if (formFillData.username === "") {
      formError.username = "user name is required";
    }
    if (formFillData.password === "") {
      formError.password = "password is required";
    }
    setErrorMessage(formError);

    if (Object.keys(formError.length === 0)) {
      saveUser();
    } else {
      toast.error("fill full data");
      console.log(errorMessage);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col">
      <div
        className="w-[350px] h-[600px] mt-3 flex items-center 
    border border-1 border-gray-300 flex-col "
      >
        <div className="">
          <img
            className="mt-12"
            src={TitleImage}
            alt="Logo"
            style={{ width: "175px", height: "50px" }}
          />
        </div>
        <div>
          <h3 className="text-center text-base mt-4 font-semibold text-gray-500 leading-4">
            Sign up to see photos and videos
            <br />
            from your friends.
          </h3>
        </div>
        <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold rounded-md lg:px-[80px] lg:py-2 md:px-6 md:py-3 mt-6">
          Log in with Facebook
        </button>
        <p className=" mt-4 text-gray-500 lg:px-24 lg:py-1 md:px-6 md:py-3 text-sm font-semibold">
          OR
        </p>
        <div className=" flex-col ">
          <input
            onChange={handleChange}
            className="signInput mt-2 "
            type="email"
            placeholder="Email address"
            id="email"
            name="email"
            required
            autoFocus
          />
          <br />
          <input
            onChange={handleChange}
            className="signInput mt-2"
            type="text"
            placeholder="Full Name"
            id="name"
            name="fullname"
            required
          />
          <br />
          <input
            onChange={handleChange}
            className="signInput mt-2 "
            type="text"
            placeholder="username"
            id="user"
            name="username"
            required
          />
          <br />
          <input
            onChange={handleChange}
            className="signInput mt-2"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            required
          />
        </div>
        <div className="w-[268px] h-[100px] ">
          <div className="text-xs text-center mt-2">
            People who use our service may have uploaded your contact
            information to Instagram.
            <a
              href="https://www.facebook.com/help/instagram/261704639352628"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="linkSpan">Learn more</span>
            </a>
          </div>
          <div className="text-xs text-center mt-4">
            By signing up, you agree to our{" "}
            <a
              href="https://help.instagram.com/581066165581870/?locale=en_GB"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <span className="linkSpan">Terms</span>
            </a>
            ,
            <a
              href="https://www.facebook.com/privacy/policy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="linkSpan">Privacy Policy</span>
            </a>{" "}
            and{" "}
            <a
              href="https://privacycenter.instagram.com/policies/cookies/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="linkSpan">Cookies Policy</span>.
            </a>
          </div>
        </div>
        <button
          onClick={sumbitForm}
          className="bg-blue-400 text-white text-sm font-semibold rounded-md lg:w-[200px] lg:py-2 md:py-2 sm:py-2 sm:w-20 cursor-default"
        >
          Sign Up
        </button>
      </div>
      <div className="w-[350px] h-16 border border-1border-gray-300 flex justify-center items-center mt-2">
        <p className="text-sm ">
          {" "}
          have an account?{" "}
          <span
            className="text-sm font-medium text-blue-500 cursor-pointer"
            onClick={() => routeNavigate("/login")}
          >
            Log in
          </span>{" "}
        </p>
      </div>

      <div className="w-[350px] h-18 mt-2">
        <p className="text-center text-sm">Get the app.</p>
        <div className="flex gap-3 flex justify-center my-6">
          <a
            href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3DBB6917D7-37B1-435C-92DA-4A0D28DBC10A%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge&pli=1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="h-[40px]" src={PlayStore} alt="playstore logo" />
          </a>
          <a
            href="https://apps.microsoft.com/detail/9NBLGGH5L9XT?hl=en-US&gl=US"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img className="h-[40px]" src={Microsoft} alt="playstore logo" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
