import { createAsyncThunk , createSlice, isFulfilled } from "@reduxjs/toolkit";
import { apiFetch } from "../api/api";

export const getDashboardStats=createAsyncThunk(
    "admin/getDashboardStats",

    async (_,{rejectWithValue})=>{
        try {
            const response=await apiFetch("/admin/dashboard");

            const result=await response.json();

            if(!response.ok){
                return rejectWithValue( result.message || "Failed to fetch the dashboard statistics")
            }

            return result.data;

        } catch (error) {
            return rejectWithValue( error.message || "Something went wrong")
        }
    }
)

const adminSlice=createSlice({
    name:"admin",

    initialState:{
        dashboardStats:null,
        loading:false,
        error:null
    },

    reducers:{},

    extraReducers:(builder)=>{
        builder

        .addCase(getDashboardStats.pending , (state)=>{
            state.loading=true,
            state.error=null
        })

        .addCase(getDashboardStats.fulfilled , (state , action)=>{
            state.loading=false,
            state.dashboardStats=action.payload
        })

        .addCase(getDashboardStats.rejected , (state , action)=>{
            state.loading=false,
            state.error=action.payload || "Failed to fetch the dashboard statistics"
        })
    }
})

export default adminSlice.reducer