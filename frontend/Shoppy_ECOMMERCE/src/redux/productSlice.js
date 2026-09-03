import {createSlice , createAsyncThunk} from "@reduxjs/toolkit"
import { apiFetch } from "../api/api";

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


export const getProductById=createAsyncThunk(
    "products/getProductById",

    async (id , {rejectWithValue})=>{
        try {
            const response=await apiFetch(`/product/${id}`);

            const result=await response.json();

            if(!response.ok){
                return rejectWithValue( result.message || "Product not found")
            }

            return result.data
        } catch (error) {
            return rejectWithValue( error.message)
        }
    }
)


export const createProduct=createAsyncThunk(
    "products/createProduct",

    async(formData , {rejectWithValue})=>{
        try {
            const response=await apiFetch("/product" , {
                method:"POST",
                body:formData
            })

            const result=await response.json();

            if(!response.ok){
                return rejectWithValue(result.message || "Failed to create Product")
            }

            return result.data
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong")
        }

    }
)

export const deleteProduct=createAsyncThunk(
    "products/deleteProduct" ,

    async(id , {rejectWithValue})=>{
        try {
            const response=await apiFetch(`/product/${id}` , 
                {
                    method:"DELETE"
                }
            )

            const result=await response.json();

            if(!response.ok){
                return rejectWithValue(result.message || "Failed to delete product")
            }

            return id;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong")
        }
    }
)

export const updateProduct=createAsyncThunk(
    "products/updateProduct",
    async ({formData , id} , {rejectWithValue})=>{
        try {
            const response=await apiFetch(`/product/${id}`,
                {
                    method:"PATCH",
                    body:formData
                }
            )

            const result=await response.json();
            if(!response.ok){
                return rejectWithValue(result.message || "Failed to update the product")
            }
             return result.data;
        } catch (error) {
            return rejectWithValue(error.message || "Something went wrong")
        }
    }
)


const productSlice=createSlice({
    name:"products",

    initialState:{
        products:[],
        selectedProduct:null,
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

        .addCase(getProductById.pending , (state)=>{
            state.loading=true,
            state.error=null
        })

        .addCase(getProductById.fulfilled , (state , action)=>{
            state.loading=false,
            state.selectedProduct=action.payload
        })

        .addCase(getProductById.rejected , (state , action)=>{
            state.loading=false,
            state.error=action.payload
        })

        .addCase(createProduct.pending , (state)=>{
            state.loading=true;
            state.error=null
        })

        .addCase(createProduct.fulfilled , (state , action)=>{
            state.loading=false;
            state.products.push(action.payload)
        })

        .addCase(createProduct.rejected , (state , action)=>{
            state.loading=false;
            state.error=action.payload;
        })

        .addCase(deleteProduct.pending , (state)=>{
            state.loading=true,
            state.error=null
        })

        .addCase(deleteProduct.fulfilled , (state , action)=>{
            state.loading=false;
            state.products=state.products.filter((product)=>product._id !== action.payload)
        })

        .addCase(deleteProduct.rejected , (state , action)=>{
            state.loading=false, 
            state.error=action.error.message 
        })

        .addCase(updateProduct.pending, (state) => {
           state.loading = true;
           state.error = null;
        })

        .addCase(updateProduct.fulfilled, (state, action) => {
           state.loading = false;

           const updatedProduct = action.payload;

           const index = state.products.findIndex(
            (product) => product._id === updatedProduct._id
        );

        if (index !== -1) {
           state.products[index] = updatedProduct;
         }
       })

       .addCase(updateProduct.rejected, (state, action) => {
          state.loading = false;
           state.error = action.error.message;
       })
    }
})

export default productSlice.reducer