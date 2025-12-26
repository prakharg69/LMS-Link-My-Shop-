import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice.js"
import shopReducer from "./Slices/shopSlice.js"


export const store  = configureStore({
    reducer:{
        auth:authReducer,
        shop:shopReducer
    }
})