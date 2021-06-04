import {useContext, useEffect, useState} from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
import "./feed.css";
import { AuthContext } from "../../context/AuthContext";



export default function Feed({username}) {
  const [posts,setPosts] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(()=>{
    const fetchPosts = async() => {
      const res = username 
      ? await axios.get("/posts/profile/"+username) 
      : await axios.get("posts/timeline/"+user._id);
      setPosts(res.data.sort((p1,p2)=>{
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }))
    };
    fetchPosts();
  },[username,user])
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username||username===user.username) && <Share />}
        {posts.map((p) => (
          <Post key={p.id} post={p} />
        ))}
      </div>
    </div>
  );
}
