import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true  //unique email id for all the user 
    },
    password:
    {
        type:String,
         required:true,
         minlength:5
    },
    blogs:[{type: mongoose.Types.ObjectId,   //get by user ID
             ref:"Blog",   //collection name, that we want to populate when passing blogs:{} as reference  => poppulate("blogs")      
             required:true}]
});
export default mongoose.model("User",userSchema);   //(name of the collection,userSchema)
//in mongodb collection will be stored as  users