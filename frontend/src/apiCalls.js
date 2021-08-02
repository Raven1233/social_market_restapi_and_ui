import axios from "axios";
export const loginCall = async(userCredentials,dispatch)=>{
    dispatch({type: "LOGIN_START"});
    try{
        const res = await axios.post("auth/login",userCredentials);
        dispatch({type:"LOGIN_SUCCESS", payload:res.data});
    }catch(err){
        alert('Login error(Incorrect username or password)');
        dispatch({type:"LOGIN_FAILURE", payload:err});
    }
}

export const logoutCall = async(userCredentials,dispatch)=>{
    dispatch({type: "LOGOUT"});
    try{
        const res = await axios.post("auth/login",userCredentials);
        res.status(200).json("user has logged out")
    }
    catch(err){
        dispatch({type:"LOGOUT_FAILURE",payload:err});
    }
}