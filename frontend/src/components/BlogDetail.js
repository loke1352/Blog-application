import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import { Box } from '@mui/system';
import { Button, InputLabel, TextField, Typography } from '@mui/material';

const labelStyle = {mt:1 , fontSize:'24px' , fontWeight:'bold'};
const BlogDetail = () => {
  const navigate = useNavigate();  //to navigate fron one URL to another URL,(here onclick update goto "/myBlogs")
  const [blog,setBlog]=useState();
  const [inputs,setInputs]= useState();
  const id= useParams().id; //to get id from URL && this .id is a variable, used App.js routes  like ("/myblogs/:id")
                            //now fetch blog details using this id 
  const handleChange=(e)=>{
  setInputs((prevState)=>({
    ...prevState,
    [e.target.name] : e.target.value
  }))
};

  const fetchDetails = async ()=>{   //function to fetch post details from id
     const res =await axios.get(`http://localhost:5000/api/blog/${id}`)
     .catch((err)=>console.log(err))
     const data = await res.data;
     return data;
  };
  const sendRequest=async()=>{
    const res=await axios.put(`http://localhost:5000/api/blog/update/${id}`,{  //axios.put("where",{what})
      title:inputs.title,
      description:inputs.description
    }).catch((err)=>console.log(err))
    const data=await res.data
    return data
  };
 useEffect(()=>{  //where we are fetching the details of the blog
   fetchDetails().then((data)=>{
    setBlog(data.blog)
    setInputs({   //fill all the previous blog data into the form bydefault in the starting
      title:data.blog.title , 
      description:data.blog.description
     })
  })
  },[id]);    
  //when id in URL changes useEffect reRun the component
console.log(blog);

const handleSubmit =(e)=>{
e.preventDefault();
console.log(inputs);
sendRequest().then((data)=>console.log(data)) //to send the updated data to the backend/server 
             .then(()=>navigate("/myBlogs"))
};

  return (
    <div>
    {
      inputs &&
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
           fontWeight="bold" padding={3} color="grey" variant='h3' textAlign={'center'}
          >
         Edit your Blog
         </Typography>

         <InputLabel sx={labelStyle}>Title</InputLabel>
         <TextField name='title' onChange={handleChange} value={inputs.title} margin='normal' variant='outlined'/>

         <InputLabel sx={labelStyle}>Description</InputLabel>
         <TextField name='description' onChange={handleChange} value={inputs.description} margin='normal' variant='outlined'/>

        <Button sx={{mt:2, borderRadius:2, }} variant="contained" color='warning' type='submit'>
         Update
        </Button>
      </Box>
     </form>
    }
    </div>
  )
}

export default BlogDetail
