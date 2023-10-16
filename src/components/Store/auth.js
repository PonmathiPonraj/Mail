import { createSlice } from "@reduxjs/toolkit";

const initialtoken=localStorage.getItem('token')
const initialEmail=localStorage.getItem('email')
const AuthState=!!initialtoken

const initialAuthState = { isAuthenticated: AuthState,token:initialtoken,email:initialEmail};

const authSlice = createSlice({
    name: "authentication",
    initialState: initialAuthState,
    reducers: {
      login(state,action) {
        state.isAuthenticated=true
        state.token=action.payload.token;
        state.email=action.payload.email;
        localStorage.setItem('token',state.token)
        localStorage.setItem('email',state.email)
        console.log(state.token,state.email)
      },
      logout(state) {
        state.isAuthenticated = false;
        localStorage.removeItem('token')
        localStorage.removeItem('email')
      },
    },
  });

  export const authActions=authSlice.actions;

  export default authSlice.reducer;