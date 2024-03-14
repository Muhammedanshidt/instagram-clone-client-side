import './App.css'; 
import { Route,Routes } from 'react-router';
import Login from './pages/user/Login';
import SignUp from './pages/user/SignUp';
import SideBar from './pages/user/SideBar';
import UserProfile from './pages/user/UserProfile';
import Home from './pages/user/Home'
import UserExplore from './pages/user/UserExplore';
import UserMessage from './pages/user/UserMessage';
import UserPost from './pages/user/UserPost';
import UserSaved from './pages/user/UserSaved';
import UserNotification from './pages/user/UserNotification'
import UserOtp from './pages/user/UserOtp';
import CreatPost from './pages/user/CreatPost'
import EditProfile from './pages/user/UserProfileEdit'
import Clintcontex from './pages/userContext/ClientContext';
import { useState } from 'react';
// import { useEffect, useState} from 'react';
// import { toast, Toaster } from "react-hot-toast";
// import { jwtDecode } from "jwt-decode";
// import { isEqual } from "lodash";
// import axios from 'axios';

function App() {


  // const [formFillData,setFormFillData] = useState("")
  const [userData,setUserData] = useState({});
  // const [auth,setauth] =useState(false) ;
  
  // useEffect(()=>{
  //   const fetchData = async () => {
  //     try {
  //       const cookiesArray = document.cookie.split(';');
  //       const cookies = cookiesArray.reduce((acc, cookie) => {
  //         const [name, value] = cookie.trim().split('=');
  //         acc[name] = value;
  //         return acc;
  //       }, {});

      
  //       const cookieToken = cookies.loginToken;
      

  //       if (!cookieToken) {
  //         setauth(false);
  //         console.log("hellow")
  //         return;
  //       }

  //       const userDetails = jwtDecode(cookieToken);
  //       //const id = userDetails.userData.email

  //       console.log(userDetails );
  //       const response = await axios.post('http://localhost:3003/user/access', {
  //         email:userDetails 
  //          });
  //          setauth(true);
  //       if (!response.data.successful) {
  //         return toast.error(response.data.error,"error");
  //       }
          
  //       const value = response.data.Data


  //       if (!isEqual(userData, value)) {
  //         setUserData(value);
        
  //         console.log(value);
  //         }
       
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
     
  //     }
  //   };

  //   fetchData(); 

  // },[userData])

  // console.log(auth);
  
  const  clientData = {
   userData,
   setUserData,
  }
  
  return (
    <>
    {/* <Toaster/> */}
    <Clintcontex.Provider value={clientData}>
    <div >

 {/* -- ROUTES ------- */}

<Routes>
  <Route path='/login' element={<Login />}/>
  <Route path="/signup" element={<SignUp />}/>
  <Route path='/otp' element={<UserOtp/>}/>
  {/* </Route> */}

  {/* <Route path="/home" element={<Home/>}/> */}
  <Route path="/" element={<SideBar/>}>
       <Route path="/home" element={<Home/>}/>
       <Route path="/create" element={<CreatPost/>}/>
       <Route path='/profile/edit' element={<EditProfile/>}/>
        
         <Route path='/profile' element={<UserProfile/>}>
           <Route path='/profile/' element={<UserPost/>}/>
           <Route path='/profile/saved' element={<UserSaved/>}/>
         </Route>
         <Route path='/explore' element={<UserExplore/>}/>
         <Route path='/inbox' element={<UserMessage/>}/>
         <Route path='/notification' element={<UserNotification/>}/>

    </Route>



  
</Routes>


    </div>
    </Clintcontex.Provider>
    </>
  );
}

export default App;
