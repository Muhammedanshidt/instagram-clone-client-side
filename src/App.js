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
import { createContext } from 'react';

export const myContext = createContext

function App() {

  
  return (
    <div >
<Routes>
  <Route path='/login' element={<Login />}/>
  <Route path="/signup" element={<SignUp />}/>
  <Route path="/home" element={<Home/>}/>
  <Route path="/" element={<SideBar/>}>

         <Route path='/profile' element={<UserProfile/>}>
           <Route path='/profile/' element={<UserPost/>}/>
           <Route path='/profile/saved' element={<UserSaved/>}/>
         </Route>
         <Route path='/explore' element={<UserExplore/>}/>
         <Route path='/inbox' element={<UserMessage/>}/>

    </Route>



  
</Routes>
{/* <Login/> */}
{/* <SignUp/> */}

    </div>
  );
}

export default App;
