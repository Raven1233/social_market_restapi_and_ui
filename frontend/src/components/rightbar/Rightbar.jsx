import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@material-ui/icons";
import {useHistory} from "react-router-dom";
import { logoutCall } from "../../apiCalls";
export default function Rightbar({ newuser }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const [conversations, setConversations]= useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.following.includes(newuser?.id)
  );

  console.log(newuser);
  
  const history=useHistory();
  const routerChange=()=>{  
    logoutCall({},dispatch);
      let path=`/login`;
      history.push(path);
  }
  useEffect(() => {
    const getFriends = async () => {
      
      try {
        const friendList = await axios.get("/users/friends/" + newuser._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [newuser]);

  const handleClick = async () => {
    
    try {
      if (followed) {
        console.log("unfollow part");
        await axios.put(`/users/${newuser._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: newuser._id });
        
      } else {
        console.log("follow part");
        await axios.put(`/users/${newuser._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: newuser._id });
        const conversation={
          senderId: currentUser._id,
          receiverId: newuser._id,
      };
        try{
          const res = await axios.post("/conversations",conversation);
          setConversations([...conversations,res.data]);
        }catch(err){
          console.log(err);
      }
        
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };
  
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other followers</b> have a birthday today.
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Followers</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
        {newuser.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed? "Unfollow" : "Follow"}
            {followed? <Remove /> : <Add />}
          </button>
        )}
        {newuser.username === currentUser.username && (
          <button className="rightbarLogoutButton" onClick={routerChange}>
            Logout
          </button>
        )}
        <h4 className="rightbarTitle">User information:-</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{newuser.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{newuser.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">UserType:</span>
            <span className="rightbarInfoValue">
              {newuser.userType === 1
                ? "Artist"
                : newuser.userType === 2
                ? "User"
                : "-"}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">People You Follow:-</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/no-avatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {newuser ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}