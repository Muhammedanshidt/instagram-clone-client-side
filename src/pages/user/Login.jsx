import React from "react";
import "./Login.css";
import TitleImage from "../../asset/title.png";
import LoginImage from "../../asset/home-phones-2x.png";
import { useNavigate } from "react-router";
import PlayStore from "../../asset/playstore.png";
import Microsoft from "../../asset/microsoft.png";
import { useState, useContext } from "react";
import axios from "axios";
import Clintcontex from "../userContext/ClientContext";
import { toast } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const { userData } = useContext(Clintcontex);
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // console.log(email);
  // console.log(password);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter fields");
      return;
    }
    console.log("hai");
    try {
      const response = await axios.post(
        "login",
        {
          email: email,
          password: password,
          userData,
        },
        { withCredentials: true }
      );

      if (response.data.success === true) {
        navigate("/profile");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error("An error occurred, please try again later.");
    }
  };
  return (
    <>
      <div className="container">
        <div className="loginImage">
          <img
            className=" mt-12"
            src={LoginImage}
            style={{ width: "450px", height: "581px" }}
            alt=""
          />
        </div>
        <div className="loginInput ">
          <div className="mainInputBox sm:flex items-center">
            <div className="titleImage">
              <img
                src={TitleImage}
                alt="Logo"
                style={{ width: "175px", height: "50px" }}
              />
            </div>
            <input
              placeholder=" email address"
              className="inputBox mt-16"
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              placeholder="password"
              className="inputBox "
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              className="bg-blue-400 hover:bg-blue-600 text-white font-bold rounded lg:px-24 lg:py-1 md:px-6 md:py-3"
              onClick={handleSubmit}
            >
              Log in
            </button>
            <p className=" mt-4 text-gray-500 lg:px-24 lg:py-1 md:px-6 md:py-3">
              {" "}
              OR
            </p>
            <a
              href="https://www.facebook.com/login.php?skip_api_login=1&api_key=124024574287414&kid_directed_site=0&app_id=124024574287414&signed_next=1&next=https%3A%2F%2Fwww.facebook.com%2Fdialog%2Foauth%3Fclient_id%3D124024574287414%26locale%3Den_GB%26redirect_uri%3Dhttps%253A%252F%252Fwww.instagram.com%252Faccounts%252Fsignup%252F%26response_type%3Dcode%252Cgranted_scopes%26scope%3Demail%26state%3D%257B%2522fbLoginKey%2522%253A%2522m5llen77dfex1gzxfoc1spf56h1hok6jv1kt9qfz17alw5z16ssd75%2522%252C%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%253Fnext%253D%25252F%2522%257D%26ret%3Dlogin%26fbapp_pres%3D0%26logger_id%3D7ce240d0-8907-4923-9979-d02626257204%26tp%3Dunspecified&cancel_url=https%3A%2F%2Fwww.instagram.com%2Faccounts%2Fsignup%2F%3Ferror%3Daccess_denied%26error_code%3D200%26error_description%3DPermissions%2Berror%26error_reason%3Duser_denied%26state%3D%257B%2522fbLoginKey%2522%253A%2522m5llen77dfex1gzxfoc1spf56h1hok6jv1kt9qfz17alw5z16ssd75%2522%252C%2522fbLoginReturnURL%2522%253A%2522%252Ffxcal%252Fdisclosure%252F%253Fnext%253D%25252F%2522%257D%23_%3D_&display=page&locale=en_GB&pl_dbl=0"
              // target="_blank"
              // rel="noopener noreferrer"
            >
              <p className="mt-6 text-sm">Log in with Facebook</p>
            </a>
            <p className="text-green-900 text-xs mt-6">
              Forgotten your password?
            </p>
          </div>
          <div className="w-[350px] h-16 border border-1border-gray-300 flex justify-center items-center">
            <p className="text-sm ">
              {" "}
              Don't have an account?{" "}
              <span
                className="text-sm font-medium text-blue-500 cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign up
              </span>{" "}
            </p>
          </div>
          <div className="w-[350px] h-16">
            <p className="text-center text-sm">Get the app.</p>
            <div className=" flex gap-3 flex justify-center mt-6 ">
              <a
                href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3DBB6917D7-37B1-435C-92DA-4A0D28DBC10A%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge&pli=1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-[40px]"
                  src={PlayStore}
                  alt="playstore logo"
                />
              </a>
              <a
                href="https://apps.microsoft.com/detail/9NBLGGH5L9XT?hl=en-US&gl=US"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="h-[40px]"
                  src={Microsoft}
                  alt="playstore logo"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;

// --- COMMENT AREA

// import { Button } from "@material-tailwind/react";
// import { Carousel } from "@material-tailwind/react";
// import { Carousel } from "@material-tailwind/react";

// import LoginSubImageOne from "../../asset/loginImageTwo.png";
// import LoginSubImageTwo from "../../asset/loginImage.png";
// import LoginSubImageThree from "../../asset/loginImageThree.png";
