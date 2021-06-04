import React from "react";
import { useContext, useRef } from "react";
import "./login.css";
import {loginCall, logoutCall} from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext";
import {CircularProgress, Link} from "@material-ui/core";
import {useHistory} from "react-router-dom";


export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  const history=useHistory();
  
  const handleClick = (e)=>{
    e.preventDefault();  
    loginCall(
      { email: email.current.value, password: password.current.value }, 
      dispatch
    );
  };

  const routerChange=()=>{
    let path=`/register`;
    history.push(path);
  }
  console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">ArtMe!</h3>
          <span className="loginDesc">
            Connect with artists and find a place for your art on ArtMe!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Email" type="email" className="loginInput" ref={email}/>
            <input placeholder="Password" type="password" minLength="6" className="loginInput" ref={password}/>
            <button className="loginButton" type="submit" disabled={isFetching}>{isFetching ? <CircularProgress color="white" size="20px"/>:"Log In"}</button>
              <button className="loginRegisterButton" onClick={routerChange}>
                {isFetching? <CircularProgress color="white" size="20px"/>:"Create a New Account"}
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}
