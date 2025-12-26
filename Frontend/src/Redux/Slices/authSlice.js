import { createSlice } from "@reduxjs/toolkit";
import { LogOut } from "lucide-react";

const initialState = {
    user:null,
    isLoggedIn:false,
    loading:true
}
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state,action){
            state.user= action.payload
            state.isLoggedIn = true
            state.loading = false
        },
        Logout(state){
            state.user= null;
            state.isLoggedIn= false,
            state.loading= true
        },
        setLoading(state,action){
            state.loading= action.payload;
        }

    }
})
export const {setUser,setLoading,Logout} = authSlice.actions;
export default authSlice.reducer;