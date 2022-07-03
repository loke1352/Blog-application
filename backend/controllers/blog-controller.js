import mongoose from "mongoose";
import Blog from "../model/Blog"
import User from "../model/User"

export const getAllBlogs = async(req,res,next)=>{
  let blogs;
    try{
       blogs=await Blog.find().populate("user");  // it will return array blogs[] of blog
                                            //and will also populate the User (at blog.user which contain userId)
    }catch(err){
        console.log(err);
    }
   if(!blogs)
   {
       return res.status(404).json({message:"No Blog Found..."})
   }
   //if everything is ok then return blogs
   return res.status(200).json({blogs});
}

//--------------------------------------

export const addBlog = async(req,res,next)=>{
    const {title,description,image,user} =req.body;    //grab all the information from the request.body, destructuring of data
  //here user will contain the id so when adding a blog=> check for existing user
  let existingUser;
  try{
    existingUser=await User.findById(user);
  }catch(err){
      return console.log(err);
  }
   if(!existingUser)
   {
       return res.status(400).json({message:"Unable to find user by this ID"});
   }
   //and if everything working fine the create a new blog
    const blog=new Blog({   //create new instance of the Blog
       title,
       description,
       image,
       user
    }); 
    try{
  //   await blog.save();  save the blog instances that we just created
  //now we not only have to save the blog but add for the user also => so create a session for it 
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    existingUser.blogs.push(blog); //push into user's blogs[] array
    await existingUser.save({session});
    await session.commitTransaction();
    }catch(err){
        console.log(err);
        return res.status(500).json({message:err});
    }
    return res.status(200).json({blog});   //pass the {blog} as object in json()
}

//--------------------------------------

export const updateBlog =async(req,res,next)=>{
    
    const { title, description }=req.body; //we only update title and description(not img) on the blog. and by grabing it from request.body
    const blogId=req.params.id;
    let blog;
    try{
        blog =await Blog.findByIdAndUpdate(blogId,{
         title,   //ot title : title   that we received from req.body
         description
     })
    }catch(err){
        console.log(err);
    }
    if(!blog)
    {
        return res.status(500).json({message:"Unable to update the blog !"});
    }
    return res.status(200).json({blog});   //it will send the old blog 
}

//--------------------------------------

export const getById=async(req,res,next)=>{
    const singleId=req.params.id;
    let blog;
    try{
       blog = await Blog.findById(singleId);
    }catch(err){
        console.log(err);
    }
    if(!blog)
    {
        return res.status(404).json({message:"No Blog found..."})
    }
    return res.status(200).json({blog});
}

//-----------------------------------------
//whenever we delte a blog we have to delete it from Blogs database as well as from the users collection also
export const deleteBlog = async(req,res,next)=>{
    const id =req.params.id;   //blog id
    let blog;
 try{
     blog= await Blog.findByIdAndRemove(id).populate('user');  //populate(ref) will populate the data from the ref= user collection => so this blog will contain blog as well as user object also
     await blog.user.blogs.pull(blog);//blog-> userobject ->blogs[] array->delete this blog(blog id)
     await blog.user.save();    //after deleting blog from the user also , save the user otherwise previous data will be showed
    }catch(err){
     console.log(err);
 }
 if(!blog)   //if no blog found
 {
     return res.status(500).json({message:"No such Blog found!!"});
 }

 return res.status(200).json({message:"Successfully deleted..."});
}

//---------------------------------

export const getByUserId = async(req,res,next)=>{//this will be used in UserBlogs.js component to get user's all blog
const userId=req.params.id;
let userBlogs;
try{
 userBlogs= await User.findById(userId).populate("blogs");  //here reference is blogs[] array, that we use in User Schema
}catch(err){
    console.log(err);
}
if(!userBlogs)  
{
  return res.status(404).json({message:"No blog found..."})  
}
return res.status(200).json({user:userBlogs});  //this user contain user's data of userId, in which blogs[] array                                                 
}                                                // contain all the blogs of this user=>we can access it by
                                                  // either (title:user.blogs[i].title)      or by using map
                                                   // user.blogs.map(blog,index)=>{title:user.blogs.blog.title }