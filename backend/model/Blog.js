import mongoose from "mongoose";

const blogSchema=new mongoose.Schema({
  title:{
      type:String,
      required:true
   },
  description:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  user:{            //this is only user ID not any information
    type:mongoose.Types.ObjectId,  //it will contain user ID as (user)
    ref:"User",  //collection name , that we want to populate over "user" as reference  =>  populate("user") reference should be
                   //  same as we use here user:{}
    required:true
  }
});

export default mongoose.model("Blog",blogSchema);