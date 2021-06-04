import { Link } from "@material-ui/core";
import axios from "axios";
import { useRef } from "react";
import {useHistory} from "react-router";
import "./register.css";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history = useHistory();

  const handleClick = async(e)=>{
    e.preventDefault();  
    if(passwordAgain.current.value!==password.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match!!")
    }else{
      const user={
        username: username.current.value,
        email: email.current.value,
        password: password.current.value
      }
      try{
         const res = await axios.post("/auth/register",user);
         history.push("/login");
      }catch(err){
         console.log(err);
      }
     
    }

  }


  const routerChange=()=>{
    let path=`/login`;
    history.push(path);
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Artme!</h3>
          <span className="loginDesc">
            Connect with artists and sell your art on Artme!
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input placeholder="Username" ref={username} className="loginInput" />
            <input placeholder="Email" ref={email} className="loginInput" type="email" />
            <input placeholder="Password" ref={password} className="loginInput" type="password" minLength="6"/>
            <input placeholder="Password Again" ref={passwordAgain} className="loginInput" type="password" minLength="6"/>
            <button className="loginButton" type="submit">Sign Up</button>
              <button className="loginRegisterButton" onClick={routerChange}>
                Log into Account
              </button>
          </form>
        </div>
      </div>
    </div>
  );
}
