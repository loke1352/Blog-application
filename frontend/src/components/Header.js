import React,{useState} from 'react'
import {AppBar,Box,Button,Tab,Tabs,Toolbar,Typography} from '@mui/material';
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {authActions} from "../store"

const Header = () => {
  const dispatch= useDispatch();
  const [value,setValue]=useState(0);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <AppBar position='sticky'
            sx={{background:"linear-gradient(90deg, rgba(14,5,68,1) 0%, rgba(18,67,103,1) 48%, rgba(0,77,227,1) 100%)"}}  >
    <Toolbar>
      <Typography variant='h4'>BlogsApp</Typography>
      
     {isLoggedIn && <Box display="flex" marginLeft='auto' marginRight='auto'>
    <Tabs 
      textColor='inherit'
      value={value} 
      onChange={(e,val)=>setValue(val)}
      >
        <Tab LinkComponent={Link} to="/blogs" label="All Blogs"/>
        <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs"/>
        <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs"/>
      </Tabs>
    </Box>}
      
      {/* <Box>  acts like a div in mui */}
       <Box display="flex" marginLeft="auto">
      { !isLoggedIn && <>   
       <Button            //LOGIN Button
       //onClick={()=>setSignState(false)}
       LinkComponent={Link} to="/auth"
       variant="contained" 
       sx={{margin:1 ,borderRadius:10}} 
       color="warning">
       Login
       </Button>
       <Button         //SIGNUP Button
       //onClick={()=>setSignState(true)}
       LinkComponent={Link} to="/auth"
       variant = "contained" 
       sx={{margin:1 , borderRadius:10}} 
       color='warning'>
       Signup
       </Button>
       </>
      }
      { isLoggedIn &&         //if isLoggedIn is true
       <Button             //LOGOUT Button
        onClick={()=>dispatch(authActions.logout())}
        LinkComponent={Link}
        to="/auth"
        variant="contained" 
        sx={{margin:1 ,borderRadius:10}} 
        color="warning">
        Logout
        </Button>}
      </Box>
    </Toolbar>
  </AppBar>
  )
};

export default Header;
