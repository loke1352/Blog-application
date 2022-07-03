import React, { useState } from 'react'
import {Box, Button, TextField , Typography} from "@mui/material"
import axios from "axios";  //used to send the request to the backend
import { authActions } from "../store";
import { useDispatch } from "react-redux"; 
import {useNavigate} from "react-router-dom";
//import {setSignState} from './Header';

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs,setInputs]= useState({  //handling the state of the input TextFeids
    name:"",
    email:"",
    password:""
  });
  const [isSignup,setIsSignup]=useState(false);
   //console.log(signState);

  const sendRequest = async(type="login")=>{      //bydefault request type is login
    const res=await axios.post(`http://localhost:5000/api/user/${type}`,{
      name:inputs.name,
       email:inputs.email,
       password:inputs.password
     }).catch((err)=>console.log(err));
     //axios.post(backend url,json data to be send) bcoz login/signup is a post http request
     const data=res.data;
     return data;
   };

  const handleChange = (e)=>{
    setInputs((prevState)=>({
      ...prevState,
      [e.target.name] : e.target.value  //updating new value
    }))
  };
 const handleSubmit = (e)=>{
   e.preventDefault();  //to prevent the form data into the URL
   console.log(inputs);  //here inputs contains all the data, we filled into the form, (saving in it using useState())
   //now time to send this inputs data to the backend
   if(isSignup)
   {
    sendRequest("signup")
    .then((data)=>localStorage.setItem("userId",data.user._id)) //as user signup save the userId at localStorage  
    .then(()=>dispatch(authActions.login()))
    .then(()=>navigate("/blogs"))
    .then((data)=>console.log(data));
   }
   else{    //for login
    sendRequest()
    .then((data)=>localStorage.setItem("userId",data.user._id))
    .then(()=>dispatch(authActions.login()))
    .then(()=>navigate("/blogs"))
    .then((data)=>console.log(data));  //bydefault type  is login so no need to pass here
   }
   };


  return (
  <div>
    <form onSubmit={handleSubmit}>
    <Box maxWidth={400} display={"flex"} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}
        boxShadow="10px 10px 20px #ccc" padding={3} margin="auto" marginTop={5} borderRadius={5} >
         {/* LOGIN   or   SIGNUP*/}
        <Typography variant="h2" padding={3} textAlign="center">{isSignup ? "Signup" : "Login"}</Typography>

      { isSignup && <TextField name='name' onChange={handleChange} value={inputs.name} placeholder='Name' margin='normal'/>}   
             {/*define name="" as identifier*/}
        <TextField name='email' onChange={handleChange}  value={inputs.email} placeholder='Email' margin='normal'/>
        <TextField name='password' onChange={handleChange}  value={inputs.password} placeholder='Password' margin='normal'/>

    <Button type='submit' variant='contained' sx={{borderRadius:3, marginTop:3, marginBottom:1}} color='warning'>Submit</Button>
    <Button onClick={()=>setIsSignup(!isSignup)}  sx={{borderRadius:3}}>Go to {isSignup ? "Login" : "Signup"}</Button>
      </Box>
    </form>
  </div>
  )
}

export default Auth;

