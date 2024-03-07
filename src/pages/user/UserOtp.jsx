import React from "react";
import { useState,useContext } from "react";
import Clintcontex from "../userContext/ClientContext";
import { useNavigate } from "react-router";
import axios from "axios";

function UserOtp() {

  const [opt,setOtp] = useState("")
  const {userData} = useContext(Clintcontex)
  const navigate = useNavigate()

 // /otpverify
  console.log("hello");

  const handleChange = (value) => {
  

    // console.log(value);
    if (value.match(/^\d*$/) && value.length <= 6) {
      setOtp(value);
    }
    console.log(opt);
  }

  const submitOtp = async()=>{
    try {

      const backendResponse = await axios.post("http://localhost:3003/user/otpverify",{
        userData,
        opt
      });
      if(backendResponse.data.success){
        alert(backendResponse.data.message)
        
        navigate("/login")
      }
    } catch (error) {
      console(error);
    }
  }
  return (
    <>
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="font-semibold text-3xl">
                <p>Email Verification</p>
              </div>
            </div>

            <div>
              <form action="" method="post" onSubmit={submitOtp}>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-1">
                    <div className="w-96 h-16">
                      <input
                      onChange={(e)=> handleChange (e.target.value)}
                        className="w-full h-full flex flex-col items-center justify-center text-2xl text-center px-5 outline-none rounded-xl border border-gray-300 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                        type="text"
                        name=""
                        id=""  
                      />
                    </div>
     
                  </div>

                  <div className="flex flex-col space-y-5">
                    <div>
                      <button
                        className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
                        type="submit"
                      >
                        Verify Account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserOtp;
