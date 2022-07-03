import {configureStore, createSlice} from '@reduxjs/toolkit';

const authSlice = createSlice({  //slice of the authantication
    name:"auth",
    initialState:{isLoggedIn : false},
    reducers:{   //reducer function handles state of redux
        login(state){   //login and logout are reducer functions  =>action ceator
            state.isLoggedIn = true   //when user is login show only logout button
        } ,   //both the function have access to the state of redux
         logout(state){
            localStorage.removeItem("userId");
             state.isLoggedIn = false   //when is user not loggedin then show login and signup button
         }
    }
});

export const authActions = authSlice.actions  
export const store = configureStore({
  reducer : authSlice.reducer   //if you have multiple reducer than create object
})