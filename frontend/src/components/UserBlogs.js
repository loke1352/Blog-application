import React, { useEffect, useState } from 'react'
import axios from "axios";
import Blog from './Blog';
const UserBlogs = () => {
  const [user,setUser]=useState();  //bydefault it is an empty object {name,email,password,blogs[]}
  const id = localStorage.getItem("userId");

  const sendRequest=async ()=>{
 const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`)
  .catch((err)=>console.log(err));  //we defined the functionality
  //now we get the data
  const data= await res.data;  //but we need a State to store the data => useState() hook is used for it
  return data;
  }
  useEffect(()=>{
    sendRequest().then((data)=>setUser(data.user));//store the user object(data.user) into useState's variable user
  },[]);
console.log(user);//now this user contain all the element of a user whose id is given like{name,email,password,blogs[]}
  
  return (
    <div>
      {  user && user.blogs && user.blogs.map((blog,index)=>(
      <Blog 
      key={index}
      id={blog._id}
      isUser={true}  //bcoz userBlogs will always be of loggedin user's blog =>always show delete & update buttons
      title={blog.title} 
      description={blog.description} 
      imageURL={blog.image} 
      userName={user.name}/>
     ))} 
    </div>
  )
}

export default UserBlogs
