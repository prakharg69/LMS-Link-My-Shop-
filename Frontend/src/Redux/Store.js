import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/authSlice.js"
import shopReducer from "./Slices/shopSlice.js"
import digitalReducer from "./Slices/DigitalSite.js"

export const store  = configureStore({
    reducer:{
        auth:authReducer,
        shop:shopReducer,
        listing:digitalReducer

    }
})