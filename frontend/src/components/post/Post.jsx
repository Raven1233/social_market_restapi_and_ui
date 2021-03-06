import "./post.css";
import { Delete, MoreVert } from "@material-ui/icons";
import { useContext, useEffect,useState } from "react";
import axios from "axios";
import {format} from "timeago.js"
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length);
  const [isLiked,setIsLiked] = useState(false);
  const [user,setUser] = useState({});
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const {user:currentUser} = useContext(AuthContext);

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))
  },[currentUser._id,post.likes])


  useEffect(()=>{
    const fetchUser = async() => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data)
    };
    fetchUser();
  },[post.userId])


  const likeHandler =()=>{
    try{
       axios.put("/posts/"+post._id+"/like", {userId:currentUser._id})
    }catch(err){

    }
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }
  
  const deletePost=async()=>{
      const find_post=await axios.get(`/posts/${post._id}`)
      if(find_post===undefined){
        console.log("does not exist")
      }
      else{
        try{
          await axios.delete(`/posts/${post._id}`, {data:{userId:currentUser._id}});
          window.location.reload();
        }
        catch(err){
          console.log(err);
        }
      }
      
  }
  const history=useHistory();
  const routePaywall=async()=>{
    const find_post=await axios.get(`/posts/${post._id}`)
    if(find_post===undefined){
      console.log("does not exist")
    }
    else{
      let path=`/paywall/${post._id}`
      history.push(path);
      window.location.reload();
    }
  }
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={user.profilePicture? PF+user.profilePicture : PF+"person/no-avatar.png"}
                alt=""
              />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
            
          </div>
          <div className="postTopRight">
            {post.userId==currentUser._id&&(
                <Delete onClick={deletePost}/>
            )}
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <br></br>
          <span className="postPrice">Price:-{post.price?post.price:" (Not for sale!!!)"}</span>
          <img className="postImg" src={PF+post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          {post.price!=="" && (<div className="postBottomRight">
            {user.username !== currentUser.username && (
              <button className="buyNowButton" onClick={routePaywall}>Buy now</button>
            )}
          </div>)}
        </div>
      </div>
    </div>
  );
}
