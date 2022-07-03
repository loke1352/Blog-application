//it contain a single <Card/> with variable data, we can access it by receiving some data/information through PROPS
import React from 'react'
import {Box,Avatar, Card, CardContent, CardHeader, CardMedia, Typography, IconButton} from "@mui/material"
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const Blog = ({title,description,imageURL,userName,isUser,id}) => {  //accepting multiple props here
 // console.log(title,isUser);  //to check which user is ture (on"/myBlog" only that user's post should be true)
  //console.log(id);     //to confirm id is coming here or not

  const navigate = useNavigate(); //to navigate from one url to another,(whenever we click on delete or update post here) 
  
  const deleteRequest=async ()=>{
    const res=await axios.delete(`http://localhost:5000/api/blog/${id}`) 
     // .catch((err)=>console.log(err))
      const data=await res.data
      return data
  };
  const handleDelete =()=>{
  deleteRequest().then((data)=>console.log(data))
   .then(()=>navigate("/blogs"))
  };
  const handleEdit = (e)=>{
    console.log(id);
   navigate(`/myBlogs/${id}`);
  };
  return (
    <div>
      <Card sx={{ 
        width: "40%" , 
        margin:"auto", 
        mt:2, 
        padding: 2, 
        boxShadow:"5px 5px 10px #ccc", 
        ":hover":{ 
          boxShadow:"10px 10px 20px #ccc"
            }
      }}
      >
      {isUser && (   //edit and delete button only if userid is same as loggedin user id
        <Box display="flex">
        <IconButton onClick={handleEdit} sx={{ml:"auto"}} >
          <ModeEditOutlineIcon color="warning" />   {/*edit button*/}
          </IconButton>
        <IconButton  onClick={handleDelete}>
          <DeleteForeverIcon color="error" />        {/*delete button*/}
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red"}} aria-label="recipe">
            {userName.charAt(0)}
          </Avatar>
        }
    
        title={title}
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
      <CardContent>
      <hr/>
      <br/>
        <Typography variant="body2" color="text.secondary">
        <b>{userName}</b> {": "}
         {description}
        </Typography>
      </CardContent>
    </Card>
    </div>
  )
}

export default Blog;
