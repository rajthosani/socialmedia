import "./login.css";
import { useContext, useRef,useReducer } from "react";

import { CircularProgress } from "@material-ui/core";
import { AuthContext } from "../../context/AuthContext";
//import AuthReducer from '../../context/AuthReducer';
import { useNavigate } from 'react-router-dom';
import {setUser} from '../../components/redux/UserActions';
import axios from 'axios';
import {useDispatch} from 'react-redux';

export default function Login() {
  const email=useRef();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const password=useRef();
  const handlesubmit=async(e)=>{
    e.preventDefault();
    let data={email: email.current.value,password: password.current.value};
    const res=await axios.post('https://evening-scrubland-32847.herokuapp.com/api/auth/login',data);
    
    dispatch(setUser(res?.data));
    navigate('/');

  }

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Lamasocial</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handlesubmit}>
            <input placeholder="Email" className="loginInput" required ref={email}/>
            <input placeholder="Password" type='password' required minLength='6' className="loginInput" ref={password}/>
            <button className="loginButton" type="submit" >Login</button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
              Create a new account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}