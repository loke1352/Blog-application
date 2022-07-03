import Header from "./components/Header";
import Blogs from "./components/Blogs";
import UserBlogs from "./components/UserBlogs";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import Auth from "./components/Auth";

import React, { useEffect } from "react";
import {Route, Routes} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";

function App() {
  const isLoggedIn =useSelector(state => state.isLoggedIn); //it is used to grab the state from redux
  const dispatch = useDispatch();
  console.log(isLoggedIn);
  useEffect(()=>{        //whenever <App/> component render, even after page reloading => check if localstorager
  if(localStorage.getItem("userId"))   //contain user id =>if contain that means he has not been loggedout yet
    dispatch(authActions.login())       // so dispatch the login() action from redux
  },[dispatch]);
  return (
   <>
   <header>
      <Header/>
   </header>
    <main>
      <Routes>
        {  
        !isLoggedIn 
          ? 
         <><Route path="/" element={<Blogs/>} /> 
           <Route path="/blogs" element={<Blogs/>}/>
           <Route path="/auth" element={<Auth/>}/></> 
         :
      <><Route path="/blogs" element={<Blogs/>} />
        <Route path="/blogs/add" element={<AddBlog/>}/>
        <Route path="/myBlogs" element={<UserBlogs/>}/>
        <Route path="/myBlogs/:id" element={<BlogDetail/>}/>
        </> 
         }
      </Routes>
    </main>
   </>
  );
}

export default App;
