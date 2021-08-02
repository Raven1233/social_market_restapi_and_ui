import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {Link} from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
export default function Topbar() {

  
  const {user} = useContext(AuthContext);
  const [curruser,setCurrUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
    const fetchUser = async() => {
      const res = await axios.get(`/users?userId=${user._id}`);
      setCurrUser(res.data)
    };
    fetchUser();
  },[user._id])

  const history=useHistory();
  const routerProfile=async()=>{
    const username = document.getElementById("searchInput").value;
    
    const user_found= await axios.get(`/users?username=${username}`);
    console.log(user_found);
    if(user_found===undefined){
      console.log("hello");
      Swal.fire({
        position: 'right-center',
        icon: 'error',
        title: 'User not found',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else{
      console.log(username);
      let path=`/profile/${username}`;
      history.push(path);
      window.location.reload();
    }
  }
  
  const handleClick=(e)=>{
    e.preventDefault();
    let path=`/messenger`;
    history.push(path);
    window.location.reload();
  }
  
  const handleKeyPress=(e)=> {
    if (e.key === 'Enter') {
        routerProfile(); 
    }
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
          <span className="logo">ArtMe!</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for an artist"
            id="searchInput"
            type="text"
            onKeyUp={handleKeyPress}
          />
          <Search className="searchButton" onClick={routerProfile}></Search>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{textDecoration:"none"}}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <a href="#" onClick={handleClick} style={{textDecoration:"none"}}>
            <span className="topbarLink">Messenger</span>
          </a>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            
          </div>
          <div className="topbarIconItem">
            <Chat />
            
          </div>
          <div className="topbarIconItem">
            <Notifications />
            
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={
            curruser.profilePicture
              ? PF + curruser.profilePicture
              : PF + "person/no-avatar.png"
          } 
          alt="" 
          className="topbarImg"/>
        </Link>
      </div>
    </div>
  );
}
