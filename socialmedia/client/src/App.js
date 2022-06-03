import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {BrowserRouter,Route,Navigate, Routes} from "react-router-dom";
//import {useContext} from "react";
//import {AuthContext} from "./context/AuthContext";
import {useSelector} from "react-redux";

function App() {
 
  const {user}=useSelector(state=>state.UserReducer);
  console.log('user from app.js is',user);
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={user.username?<Home/>:<Login/>}></Route>
        
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}>
          
        </Route>
        <Route path="/profile/:username" element={<Profile/>}>
        </Route>
      </Routes>
    </BrowserRouter>
  )
  
}

export default App;