import express from "express"
import mongoose from "mongoose"
import userRouter from "./routes/user-routes"
import blogRouter from "./routes/blog-routes"
import cors from "cors";

const app=express();  //give all functionality of express to the variable app
app.use(cors());
app.use(express.json());              //it will get the json data 
app.use("/api/user",userRouter);     //work only on route   http://locathost:5000/api/user
// app.use("/",(req,res)=>{
//     res.send("hello ji")
// });
app.use("/api/blog",blogRouter);
mongoose.connect("mongodb+srv://lokesh:kumar@cluster0.x496hq5.mongodb.net/Blog?retryWrites=true&w=majority")
.then(()=>app.listen(5000))
.then(()=>console.log("connected to database and running at port 5000"))
.catch((err)=>console.log(err));