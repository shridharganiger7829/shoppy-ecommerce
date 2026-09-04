import {createAsyncThunk , createSlice} from "@reduxjs/toolkit"
import {apiFetch} from "../api/api.js"

export const addToCart=createAsyncThunk(
    "cart/addToCart",

    async ({productId , quantity},{rejectWithValue})=>{
        try {
            const response=await apiFetch("/cart/add-cart" ,
                {
                    method:"POST",
                    headers:{
                        "Content-Type":"application/json"
                    },
                    body:JSON.stringify({
                        productId , quantity
                    })
                }
            );

            const result=await response.json();

            if(!response.ok){
                return rejectWithValue( result.message || "Failed to added to cart")
            }
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong")
        }
    }
)

const cartSlice=createSlice({
    name:"cart",
    initialState:{
       cart:null,
       cartLoading:false,
       cartError:null,

    },

    reducers:{},

    extraReducers:(builder)=>{
        builder 

        .addCase(addToCart.pending , (state)=>{
            state.cartLoading=true;
            state.cartError=null;
        })

        .addCase(addToCart.fulfilled , (state , action)=>{
            state.cartLoading=false;
            state.cart=action.payload;
        })

        .addCase(addToCart.rejected , (state , action)=>{
            state.cartLoading=false;
            state.cartError=action.payload;
        })
    }
})

export default cartSlice.reducer;
