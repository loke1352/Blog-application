//it contain all the Blogs 
import React, { useEffect, useState } from 'react'
import axios from "axios"
import Blog from "./Blog"

const Blogs = () => {
  const [blogs,setBlogs]=useState();
  const sendRequest =async()=>{
    const res=await axios.get("http://localhost:5000/api/blog").catch((err)=>console.log(err));
    const data =await res.data;  //here data is array of blog => blogs[]
    return data;
  }
  useEffect(()=>{
  sendRequest().then((data)=>{setBlogs(data.blogs)})  //data that we are receiving from backend
  },[])  //useEffect(callback , dependencies)  => run when dependencies changes in this array
  console.log(blogs);
  return (
    <div>
     { blogs && blogs.map((blog,index)=>(   //blogs[] is an array & blog is it's element(blog is a single blog)
      <Blog       
      id={blog._id}
       // {/*if isUser is true then only delete and update button will be there */}
      isUser={localStorage.getItem("userId")===blog.user._id} 
      title={blog.title} 
      description={blog.description} 
      imageURL={blog.image} 
      userName={blog.user.name}  //blog.UserCOllection.name
      />
     ))} 
    </div>
  )
}

export default Blogs
