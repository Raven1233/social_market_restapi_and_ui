import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import {Link} from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import {AuthContext} from "../../context/AuthContext";
import {useHistory} from "react-router-dom";
import axios from "axios";
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
  const routerProfile=()=>{
    const username = document.getElementById("searchInput").value;
    let path=`/profile/${username}`;
    history.push(path);
    window.location.reload();
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
          />
          <button className="searchButton" onClick={routerProfile}>Search</button>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" style={{textDecoration:"none"}}>
            <span className="topbarLink">Homepage</span>
          </Link>
          <Link to="/messenger" style={{textDecoration:"none"}}>
            <span className="topbarLink">Messenger</span>
          </Link>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">2</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
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
