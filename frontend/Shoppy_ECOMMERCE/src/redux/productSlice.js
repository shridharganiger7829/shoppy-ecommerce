import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"

const API_URL="http://localhost:8000/product"

export const getProducts=createAsyncThunk(
    "products/getProducts",

    async ()=>{
        const response=await fetch(API_URL);

        if(!response.ok) { 
            throw new Error("Failed to fetch products")
        }

        const result=await response.json();

        return result.data;

    }
)


const productSlice=createSlice({
    name:"products",

    initialState:{
        products:[],
        loading:false,
        error:null
    },

    reducers:{},

    extraReducers:(builder)=>{
        builder

        .addCase(getProducts.pending , (state)=>{
            state.loading=true,
            state.error=null
        })

        .addCase(getProducts.fulfilled , (state , action)=>{
            state.loading=false,
            state.products=action.payload
        })

        .addCase(getProducts.rejected , (state , action)=>{
            state.loading=false,
            state.error=action.error.message
        })
    }
})

export default productSlice.reducer