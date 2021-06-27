import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./thankyou.css"
export default function Thankyou(){
    const postId=useParams().id;
    const [post,setPost] = useState({});
    const [user,setUser] = useState({});
    const history=useHistory();
    useEffect(()=>{
        const fetchPost = async() => {
          const res = await axios.get(`/posts/${postId}`);
          setPost(res.data);
        };
        fetchPost();
    },[postId]);
    useEffect(()=>{
        const fetchUser = async() => {
          const res = await axios.get(`/users?userId=${post.userId}`);
          setUser(res.data)
        };
        fetchUser();
    },[post.userId])
    console.log(post);
    console.log(user);
    const deletePost=async()=>{
        try{
          await axios.delete(`/posts/${postId}`, {data:{userId:user._id}});
        }
        catch(err){
          console.log(err);
        }
    }
    window.addEventListener('load', function(){
        var form=document.getElementsByTagName('form')[0];
        form.addEventListener('submit',routePage);
    });
    const routePage=()=>{
        let path=`/`;
        history.push(path);
    }
    return(
         <div className="main">
            <h1 className="heading">Thank you for your purchase!!!</h1>
            <br></br>
            
            <form onSubmit={routePage}>
               <button className="return" type="submit" onClick={deletePost}>Return to Home</button>
            </form>
         </div>
    );
}