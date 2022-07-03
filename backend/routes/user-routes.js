import express from "express";
import {getAllUser, signup,login} from "../controllers/user-controller"

const router=express.Router();

router.get("/", getAllUser);
router.post("/signup",signup);    
router.post("/login",login);   //((path,controller function))  means on path  /login controller function login  will run

export default router;
