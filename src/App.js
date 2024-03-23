  import './App.css';
  import { Route, Routes } from 'react-router';
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
  import CreatPost from './pages/user/sideBarPages/CreatPost'
  import EditProfile from './pages/user/UserProfileEdit'
  import Clintcontex from './pages/userContext/ClientContext';
  import { useEffect, useState } from 'react';
  import { toast, Toaster } from "react-hot-toast";
  import { jwtDecode } from "jwt-decode";
  import { isEqual } from "lodash";
  import axios from 'axios';

  // axios.defaults.baseURL  = "https://instagram-clone-server-side-thqi.onrender.com/user/ ";
  function App() {
    // const [formFillData,setFormFillData] = useState("")
    const [userData, setUserData] = useState({});
    const [auth,setauth] =useState(false) ;
    console.log("before use effect");

    console.log(userData);
    
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const cookieToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
          console.log(cookieToken);
          if (!cookieToken) {
              console.log("Token not found");
              return;
          }
          const userDetails = jwtDecode(cookieToken);
              const email = userDetails.email;
              console.log("Email:", email);
          const backResponse = await axios.post("http://localhost:3003/user/access",
            { email: email },
            { withCredentials: true }
          )
            setauth(true);
          if (!backResponse.data.successful) {
            return alert("no data available");
          }
          const value = backResponse.data.Data
          console.log("backend value",value);
          if (!isEqual(userData, value)) {
            setUserData(value);
          }
        }
        catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, [userData])
    console.log(auth);
    const clientData = {
      userData,
      setUserData,
    }

    return (
      <>
        <Toaster/>
        <Clintcontex.Provider value={clientData}>
          <div >

            {/* -- ROUTES ------- */}

            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path='/otp' element={<UserOtp />} />
              {/* </Route> */}

              {/* <Route path="/home" element={<Home/>}/> */}
              <Route path="/" element={<SideBar />}>
                <Route path="/home" element={<Home />} />
                <Route path="/create" element={<CreatPost />} />
                <Route path='/profile/edit' element={<EditProfile />} />

                <Route path='/profile' element={<UserProfile />}>
                  <Route path='/profile/' element={<UserPost />} />
                  <Route path='/profile/saved' element={<UserSaved />} />
                </Route>
                <Route path='/explore' element={<UserExplore />} />
                <Route path='/inbox' element={<UserMessage />} />
                <Route path='/notification' element={<UserNotification />} />

              </Route>

            </Routes>
          </div>
        </Clintcontex.Provider>
      </>
    );
  }
  export default App;
