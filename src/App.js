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
import Clintcontex from './pages/userContext/ClientContext';
import { useState } from 'react';

function App() {


  // const [formFillData,setFormFillData] = useState("")
  const [userData,setUserData] = useState({});

  
  const  clientData = {
   userData,
   setUserData,
  }
  
  return (
    <Clintcontex.Provider value={clientData}>
    <div >

 {/* -- ROUTES ------- */}

<Routes>
  <Route path='/login' element={<Login />}/>
  <Route path="/signup" element={<SignUp />}/>
  <Route path='/otp' element={<UserOtp/>}/>
  {/* </Route> */}

  <Route path="/home" element={<Home/>}/>
  <Route path="/" element={<SideBar/>}>

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
  );
}

export default App;
