import './App.css';
import { Route, Routes } from 'react-router';
import Login from './pages/user/Login';
import SignUp from './pages/user/SignUp';
import SideBar from './pages/user/SideBar';
import UserProfile from './pages/user/UserProfile';
import Home from './pages/user/Home'
import UserExplore from './pages/user/UserExplore';
import UserPost from './pages/user/UserPost';
import UserSaved from './pages/user/UserSaved';
import UserNotification from './pages/user/UserNotification'
import UserOtp from './pages/user/UserOtp';
import CreatPost from './pages/user/sideBarPages/CreatPost'
import EditProfile from './pages/user/UserProfileEdit';
import UserSearch from './pages/user/UserSearch';
import Clintcontex from './pages/userContext/ClientContext';
import { useEffect, useState } from 'react';
import { Toaster } from "react-hot-toast";
import axios from 'axios';
import AnotherUserProfile from './pages/user/AnotherUserProfile';
import Messanger from './pages/user/UserMessenger/Messanger';
import Reels from './pages/user/reels/Reels'

axios.defaults.baseURL = "https://instagram-clone-server-side-thqi.onrender.com/user/";


function App() {

  const [userData, setUserData] = useState({});
  const [auth, setauth] = useState(false);
  const [modalOpen,setModalOpen] = useState(false);
  const [cookieData,setCookieData] = useState(null)

  console.log("before use effect");

  console.log(userData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const backResponse = await axios.get("access",
          { withCredentials: true }
        )
        console.log("backResponse:", backResponse.data);
        setUserData(backResponse.data.decode);
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [])

  console.log(userData);

  const clientData = {
    userData,
    setUserData,
    modalOpen,
    setModalOpen,
    setCookieData,
    cookieData
  }

  return (
    <>
      <Toaster />
      <Clintcontex.Provider value={clientData}>
        <div >

          {/* -- ROUTES ------- */}

          <Routes>
            <Route path='/' element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path='/otp' element={<UserOtp />} />
            {/* </Route> */}


            <Route path="" element={<SideBar />}>
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<CreatPost />} />
              <Route path='/profile/edit' element={<EditProfile />} />
              <Route path='/user/:userId' element={<AnotherUserProfile />} />


              <Route path='/profile' element={<UserProfile />}>
                <Route path='/profile/' element={<UserPost />} />
                <Route path='/profile/saved' element={<UserSaved />} />
              </Route>
              <Route path='/explore' element={<UserExplore />} />
              
              <Route path='/reels' element={<Reels />} />
              
              <Route path='/search' element={<UserSearch />} />


            </Route>

          </Routes>
        </div>
      </Clintcontex.Provider>
    </>
  );
}
export default App;
