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

export const getAllUsers=createAsyncThunk(
    "admin/getAllUsers",

    async(_,{rejectWithValue})=>{
        try {
            const response=await apiFetch("/user/getusers");

            const result=await response.json();

            if(!response.ok){
                return rejectWithValue(result.message || "Failed to get all users")
            }
            console.log(result.data)

            return result.data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong")
        }
    }
)

const adminSlice=createSlice({
    name:"admin",

    initialState:{
        dashboardStats:null,
        users:[],
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

        .addCase(getAllUsers.pending , (state)=>{
            state.loading=true;
            state.error=null;
        })

        .addCase(getAllUsers.fulfilled , (state , action)=>{
            state.loading=false;
            state.users=action.payload;
        })

        .addCase(getAllUsers.rejected , (state , action)=>{
            state.loading=false;
            state.error=action.payload;
        })
    }
})

export default adminSlice.reducer