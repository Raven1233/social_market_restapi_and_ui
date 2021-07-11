import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions, Cancel} from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
export default function Share() {
  const {user} = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const price=useRef();
  const [curruser,setCurrUser] = useState({});
  const [file, setFile] = useState(null);
  useEffect(()=>{
    const fetchUser = async() => {
      const res = await axios.get(`/users?userId=${user._id}`);
      setCurrUser(res.data)
    };
    fetchUser();
  },[user._id])
  const submitHandler= async(e) =>{
    e.preventDefault();
    const newPost={
      userId:user._id,
      desc: desc.current.value,
      price:price.current.value
    };

    if (file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try{
        await axios.post("/upload", data);
      }catch(err){
        console.log(err);
      }
    }
    try{
      await axios.post("/posts",newPost);
      window.location.reload();
    }catch(err){}
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" src={curruser.profilePicture ? PF+curruser.profilePicture : PF+"person/no-avatar.png"} alt="" />
          <input
            placeholder={"Put up a picture for sale, "+user.username+":-"}
            className="shareInput"
            ref={desc}
          />
          <textarea id="textArea" 
            placeholder={"Indicate the price of the picture:-"}
            className="sharePrice"
            ref={price}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImageContainer">
            <img className="shareImg" src ={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Artwork(supports .png, .jpg and .jpeg)</span>
                    <input style={{display:"none"}}type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                </label>
                
            </div>
            <button className="shareButton" type="submit">Put up for Sale</button>
        </form>
      </div>
    </div>
  );
}
