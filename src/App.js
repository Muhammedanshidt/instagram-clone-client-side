import './App.css'; 
import { Route,Routes } from 'react-router';
import Login from './pages/user/Login';
import SignUp from './pages/user/SignUp';
import SideBar from './pages/user/SideBar';
import UserProfile from './pages/user/UserProfile';


function App() {
  return (
    <div >
<Routes>
  <Route path='/' element={<Login />}/>
  <Route path="/signup" element={<SignUp />}/>
  <Route path="/sidebar" element={<SideBar/>}/>

      <Route path='/profile' element={<UserProfile/>}/>


  
</Routes>
{/* <Login/> */}
{/* <SignUp/> */}

    </div>
  );
}

export default App;
