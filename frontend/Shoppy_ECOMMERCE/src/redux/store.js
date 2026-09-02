import { configureStore } from "@reduxjs/toolkit";
import productReducer from './productSlice.js'
import authReducer from "./authSlice.js"
import adminReducer from "./adminSlice.js"

export const store=configureStore({
    reducer:{
        products:productReducer,
        auth:authReducer,
        admin:adminReducer
    }
})