import express from "express";
import { addBlog, deleteBlog, getAllBlogs, getById, getByUserId, updateBlog } from "../controllers/blog-controller";

const blogRouter=express.Router();  //create a router

blogRouter.get("/",getAllBlogs);    //when route is  "/" call the controller function  getAllBlogs
blogRouter.post("/add",addBlog);
blogRouter.put("/update/:id",updateBlog);  
blogRouter.get("/:id",getById);
blogRouter.delete("/:id",deleteBlog);
blogRouter.get("/user/:id",getByUserId);

export default blogRouter;