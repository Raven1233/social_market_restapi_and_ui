import "./sidebar.css";
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { useAlert } from 'react-alert'
import { useState } from "react";
import Popup from 'reactjs-popup';
import Swal from 'sweetalert2';
export default function Sidebar() {
  const [feedback,setFeedback]=useState("");
  const handleSubmit=e=>{
     e.preventDefault();
     Swal.fire({
      position: 'right-center',
      icon: 'success',
      title: 'Thank you for your feedback',
      showConfirmButton: false,
      timer: 1500
    })
     setFeedback("");
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <h3>Welcome to Artme!!!</h3>
        <br></br>
        <p>Artme is a website dedicated to up and coming artists who are strugging out there. Our platform
          has been duly engineered to cater to needs of these people. We strive to provide them with a platform 
          where they can express their talent and build a faithful community and are also able to stay motivated by
          being able to monetise their passion.
        </p>
        <br></br>
        <h3>Give us your feedback:-</h3>
        <br></br>
        <form>
        <textarea className="feedbox" onChange={(e)=>setFeedback(e.target.value)} value={feedback}/>
        <button className="feedbutton" type="submit" onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </div>
  );
}
