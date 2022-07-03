import User from "../model/User";
import bcrypt from "bcryptjs"

export const getAllUser = async(req,res,next)=>{   //requests are always asynchronus
    let users;
    try{
     users=await User.find()     //return list of documents or array[] according to filter => if no filter return all data
    }catch(err){
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message : "No User Found in our database !!"});
    }
    return res.status(200).json({users:users});   //you can also write single users bcoz both have same property  .json({users})
}

//------------------------------------------------------------------------------------------------------------

export const signup= async(req,res,next)=>{  //for defining signup function we need req.body, which contain data that we send from frontend

    const {name,email,password}=req.body;      //destructuring the req.body data    and grab the data from request.body()

    let existingUser;
    try{
       existingUser=await User.findOne({email});  //find only one user by filtering the Email ID
    }catch(err){
       return console.log(err);
    }
   
    if(existingUser)  //if user already exist, then he can not signup again => make it unautharized
    {
    return res.status(400).json({message : "User already Exist, go to login page!"});
    }

       //if user do not exist in our database then create new User in the database =>signup process
       const hashedPassword=bcrypt.hashSync(password);    //return encrypted password
    const user=new User({   //new user data =>it is a new document
        name,
        email,
        password:hashedPassword
    });

                         //now save the new User
   try{                 //use try catch bcoz it is a http task
        await user.save();   //document.save()  =>save() function help us to save document in database
   }catch(err){
      return console.log(err);
   }

   return res.status(201).json({user});
}

//---------------------------------------------------------------------

export const login = async(req,res,next)=>{
    const {email,password} = req.body;     //destructuring the req.body data    and grab the data from request.body()
    let existingUser;
    try{
       existingUser=await User.findOne({email});
    }catch(err){
        console.log(err);
    }
   
    if(!existingUser) 
    {
    return res.status(404).json({message : "User do not Exist, go to Signup page!"});
    }

  //now if user found by email ID then compare the password for login
   const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password);   //return true/false on comparing the password
   if(!isPasswordCorrect)
   {
      return res.status(404).json({message:"Incorrect Password!!"});
   }
      return res.status(200).json({message:"Login Successful...." , user:existingUser}) 
                              //here existingUser contain the User's object
}