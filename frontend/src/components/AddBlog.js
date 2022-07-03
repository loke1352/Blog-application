import {Box, Button, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';
//import { useStyles } from "./utils";


const labelStyle = {mt:1 , fontSize:'24px' , fontWeight:'bold'};
const AddBlog = () => {
  //const classes = useStyles();
  const navigate=useNavigate();
  const [inputs,setInputs]= useState({
    title:"",
    description:"",
    imageURL:""             
  });
const handleChange=(e)=>{
  setInputs((prevState)=>({
    ...prevState,
    [e.target.name] : e.target.value  //here name is identifier of textfield
  }))
};
const sendRequest = async ()=>{
  const res=await axios.post("http://localhost:5000/api/blog/add",{
    title:inputs.title,      //here inputs is the useState's variable of object type
    description:inputs.description,
    image:inputs.imageURL,           //can't write imageURL: here bcoz path is defined as image: in backend
    user:localStorage.getItem("userId")
  })
  .catch((err)=>console.log(err));
   const data= await res.data
   return data;
};
const handleSubmit=(e)=>{
  e.preventDefault();
  console.log(inputs);
  sendRequest().then((data)=>console.log(data))
  .then(()=>navigate("/myBlogs"))
};

  return (
    <div>
     <form onSubmit={handleSubmit}>
      <Box 
          border={3}
          borderColor="green"
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"} >

         <Typography
          // className={classes.font}
           fontWeight="bold" 
           padding={3} 
           color="grey" 
           variant='h3' 
           textAlign={'center'}
          >
         Post your Blog
         </Typography>

         <InputLabel  sx={labelStyle}>Title</InputLabel>
         <TextField  name='title' onChange={handleChange} value={inputs.title} margin='normal' variant='outlined'/>

         <InputLabel  sx={labelStyle}>Description</InputLabel>
         <TextField  name='description' onChange={handleChange} value={inputs.description} margin='normal' variant='outlined'/>

         <InputLabel  sx={labelStyle}>ImageUrl</InputLabel>
         <TextField  name='imageURL' onChange={handleChange} value={inputs.imageURL} margin='normal' variant='outlined'/>
        
        <Button sx={{mt:2, borderRadius:2, }} variant="contained" color='warning' type='submit'>
         Submit
        </Button>
      </Box>
     </form>
    </div>
  )
}

export default AddBlog
