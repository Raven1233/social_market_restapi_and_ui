import axios from "axios";
import { useEffect, useState } from "react";
import { useParams,Link, useHistory } from "react-router-dom";
import Tilt from 'react-tilt';
import './paywall.css';
export default function Paywall(){
    const postId=useParams().id;
    const [post,setPost] = useState({});
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [sent,setSent]=useState(false);
    const [text, setText]=useState(""); 
    const history=useHistory();   
    useEffect(()=>{
        const fetchPost = async() => {
          const res = await axios.get(`/posts/${postId}`);
          setPost(res.data);
        };
        fetchPost();
    },[postId])
    console.log(post);
    console.log(post.userId);
    window.addEventListener('load', function(){
        var form=document.getElementsByTagName('form')[0];
        form.addEventListener('submit',routePage);
    });
    const handleSend = async()=>{
        setSent(true);
        try{
            await axios.post(`http://localhost:8000/send_mail/${text}`)
        }catch(err){
            console.log(err);
        }
    }
    const routePage=()=>{
        let path=`/thankyou/${postId}`;
        history.push(path);
        window.location.reload();
    }
    return(
        <div className="paywall">
            <div className="paywallLeftTop">
                <Link to="/" style={{textDecoration:"none"}}>
                    <span id="logo">ArtMe!</span>
                </Link>
            </div>
            <div className="paywallWrapper">
                <Tilt>
                <div className="paywallRight">
                    <img id="buyingImage" src={PF+post.img} alt=""/>
                </div>
                </Tilt>
                <div className="paywallLeft">
                    
                    <form className="billingBox" >
                        <span className="billingHeading">Billing Details:-</span>
                        <br></br><br></br><br></br>
                        <span className="formTags">Name:-</span>
                        <input placeholder="Name of the customer" required type="text" className="nameInput"/>
                        <br></br>
                        <span className="formTags">Address, Line 1:-</span>
                        <input placeholder="House/Apartment no, Name of Apartment" required type="text" className="addressInput"/>
                        <br></br>
                        <span className="formTags">Address, Line 2:-</span>
                        <input placeholder="Ward/Block no, Name of locality" required type="text" className="addressInput"/>
                        <br></br>
                        <span className="formTags">City:-&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;State:-
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pincode:-</span>
                        <div className="inline">
                            <input placeholder="e.g., Kolkata" required type="text" className="cdsInput"/>
                            <input placeholder="e.g., West Bengal" required type="text" className="cdsInput"/>
                            <input placeholder="e.g., 700001" required type="text" className="cdsInput"/>
                        </div>
                        <br></br>
                        <span className="formTags">Mobile.no:-</span>
                        <input placeholder="e.g., +91-9123657355" required type="text" className="noInput"/>
                        <br></br>
                        <span className="formTags">Alternate mobile.no:-</span>
                        <input placeholder="e.g., +91-9123657355" required type="text" className="noInput"/>
                        <br></br>
                        <span className="formTags">Email Address:-</span>
                        <input type ="text" value={text} placeholder="e.g., example@gmail.com" required id="emailInput" onChange={(e)=>setText(e.target.value)}/>
                        <br></br>
                        <span className="formTags">Payment Type:-</span>
                        <select>
                            <option value="Payment">Select Payment</option>
                            <option value="Cash On Delivery">Cash On Delivery</option>
                            <option value="Credit/Debit Card">Credit/Debit Card</option>
                            <option value="UPI-(PayTM,GPay,Paypal)">UPI-(PayTM,GPay,Paypal)</option>
                            <option value="Net Banking">Net Banking</option>
                        </select>
                        <br></br>
                        <span className="formTags">Additional Comments:-</span>
                        <textarea placeholder="Write any comments about your order" required type="text" className="commentsInput"/>
                        <br></br><br></br>
                        <button className="orderButton" type="submit" onClick={handleSend}>Place Order</button>
                        <br></br><br></br>
                    </form>
                    
                </div>
                
            </div>
        </div>
    );
}