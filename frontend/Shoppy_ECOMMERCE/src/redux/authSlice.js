import {createAsyncThunk , createSlice} from "@reduxjs/toolkit";

const API_URL="http://localhost:8000/user";

export const registerUser=createAsyncThunk(
    "auth/registerUser",

    async (userData)=>{
        const response=await fetch(`${API_URL}/register` , {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(userData)
        })

        if(!response.ok){
            throw new Error("Failed to register user")
        }

        const result=await response.json();

        return result;
    }
)


export const verifyOtp=createAsyncThunk(
    "auth/verifyOtp",

    async ({email,otp})=>{
        const response=await fetch("http://localhost:8000/user/verify-otp" , {
            method:"POST",
            headers:{
                "COntent-Type":"application/json"
            },
            body:JSON.stringify({email , otp}),
        })

        if(!response.ok){
            throw new Error("Otp verification failed")
        }

        const result=await response.json()

        return result
    }
)



const authSlice=createSlice({
    name:"auth",
    initialState:{
        user:null,
        loading:false,
        error:null,
        registerSuccess:false,
        otpVerified:false,
    },

    reducers:{},

    extraReducers:(builder)=>{
       builder

       .addCase(registerUser.pending , (state)=>{
        state.loading=true;
        state.error=null;
        state.registerSuccess=false
       })

       .addCase(registerUser.fulfilled , (state , action)=>{
        state.loading=false;
        state.error=null;
        state.registerSuccess=true
       })

       .addCase(registerUser.rejected , (state , action)=>{
        state.loading=false;
        state.registerSuccess=false;
        state.error=action.error.message;
       })

       .addCase(verifyOtp.pending,(state)=>{
        state.loading=true,
        state.otpVerified=false
       })

       .addCase(verifyOtp.fulfilled , (state , action)=>{
        state.loading=false,
        state.otpVerified=true,
        state.user=action.payload.data
       })

       .addCase(verifyOtp.rejected , (state , action)=>{
        state.loading=false,
        state.error=action.error.message
       });

    },
})

export default authSlice.reducer;