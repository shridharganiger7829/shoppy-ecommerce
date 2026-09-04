import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiFetch } from "../api/api.js";


// ======================================================
// ADD TO CART
// ======================================================

export const addToCart = createAsyncThunk(
    "cart/addToCart",

    async ({ productId, quantity }, { rejectWithValue }) => {

        try {

            const response = await apiFetch(
                "/cart/add-cart",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        productId,
                        quantity
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {

                return rejectWithValue(
                    result.message || "Failed to add to cart"
                );

            }

            return result.data;

        } catch (error) {

            return rejectWithValue(
                error.message || "Something went wrong"
            );

        }

    }
);


// ======================================================
// GET CART
// ======================================================

export const getCart = createAsyncThunk(
    "cart/getCart",

    async (_, { rejectWithValue }) => {

        try {

            const response = await apiFetch(
                "/cart/get-cart"
            );

            const result = await response.json();

            if (!response.ok) {

                return rejectWithValue(
                    result.message || "Failed to get cart"
                );

            }

            return result.data;

        } catch (error) {

            return rejectWithValue(
                error.message || "Something went wrong"
            );

        }

    }
);


// ======================================================
// UPDATE CART
// ======================================================

export const updateCart = createAsyncThunk(
    "cart/updateCart",

    async (
        {
            productId,
            quantity,
            previousQuantity
        },
        { rejectWithValue }
    ) => {

        try {

            const response = await apiFetch(
                `/cart/update-cart/${productId}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        quantity
                    })
                }
            );

            const result = await response.json();

            if (!response.ok) {

                return rejectWithValue({
                    message:
                        result.message ||
                        "Failed to update cart",

                    productId,
                    previousQuantity
                });

            }

            return {
                data: result.data,
                productId,
                quantity
            };

        } catch (error) {

            return rejectWithValue({
                message:
                    error.message ||
                    "Something went wrong",

                productId,
                previousQuantity
            });

        }

    }
);


// ======================================================
// DELETE CART ITEM
// ======================================================

export const deleteCart = createAsyncThunk(
    "cart/deleteCart",

    async (productId, { rejectWithValue }) => {

        try {

            const response = await apiFetch(
                `/cart/delete-cart/${productId}`,
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (!response.ok) {

                return rejectWithValue(
                    result.message ||
                    "Failed to delete cart item"
                );

            }

            return result.data;

        } catch (error) {

            return rejectWithValue(
                error.message ||
                "Something went wrong"
            );

        }

    }
);


// ======================================================
// CLEAR CART
// ======================================================

export const clearCart = createAsyncThunk(
    "cart/clearCart",

    async (_, { rejectWithValue }) => {

        try {

            const response = await apiFetch(
                "/cart/clear-cart",
                {
                    method: "DELETE"
                }
            );

            const result = await response.json();

            if (!response.ok) {

                return rejectWithValue(
                    result.message ||
                    "Failed to clear cart"
                );

            }

            return result.data;

        } catch (error) {

            return rejectWithValue(
                error.message ||
                "Something went wrong"
            );

        }

    }
);


// ======================================================
// CART SLICE
// ======================================================

const cartSlice = createSlice({

    name: "cart",

    initialState: {

        cart: null,

        cartLoading: false,

        cartUpdating: false,

        cartDeleting: false,

        cartClearing: false,

        cartError: null

    },


    reducers: {

        // ----------------------------------------------
        // OPTIMISTIC QUANTITY UPDATE
        // ----------------------------------------------

        updateQuantityOptimistic: (
            state,
            action
        ) => {

            const {
                productId,
                quantity
            } = action.payload;

            const item = state.cart?.items?.find(
                (item) =>
                    item.product._id === productId
            );

            if (item) {

                item.quantity = quantity;

            }

        },


        // ----------------------------------------------
        // ROLLBACK QUANTITY
        // ----------------------------------------------

        rollbackQuantity: (
            state,
            action
        ) => {

            const {
                productId,
                previousQuantity
            } = action.payload;

            const item = state.cart?.items?.find(
                (item) =>
                    item.product._id === productId
            );

            if (item) {

                item.quantity = previousQuantity;

            }

        }

    },


    extraReducers: (builder) => {

        builder


        // ==================================================
        // ADD TO CART
        // ==================================================

        .addCase(
            addToCart.pending,
            (state) => {

                state.cartLoading = true;

                state.cartError = null;

            }
        )

        .addCase(
            addToCart.fulfilled,
            (state, action) => {

                state.cartLoading = false;

                state.cart = action.payload;

            }
        )

        .addCase(
            addToCart.rejected,
            (state, action) => {

                state.cartLoading = false;

                state.cartError =
                    action.payload;

            }
        )


        // ==================================================
        // GET CART
        // ==================================================

        .addCase(
            getCart.pending,
            (state) => {

                state.cartLoading = true;

                state.cartError = null;

            }
        )

        .addCase(
            getCart.fulfilled,
            (state, action) => {

                state.cartLoading = false;

                state.cart = action.payload;

            }
        )

        .addCase(
            getCart.rejected,
            (state, action) => {

                state.cartLoading = false;

                state.cartError =
                    action.payload;

            }
        )


        // ==================================================
        // UPDATE CART
        // ==================================================

        .addCase(
            updateCart.pending,
            (state) => {

                state.cartUpdating = true;

                state.cartError = null;

            }
        )

        .addCase(
            updateCart.fulfilled,
            (state) => {

                state.cartUpdating = false;

                // IMPORTANT:
                // Don't replace state.cart here.
                //
                // UI was already updated optimistically.

            }
        )

        .addCase(
            updateCart.rejected,
            (state, action) => {

                state.cartUpdating = false;

                const error =
                    action.payload;

                if (error?.productId) {

                    const item =
                        state.cart?.items?.find(
                            (item) =>
                                item.product._id ===
                                error.productId
                        );

                    if (item) {

                        item.quantity =
                            error.previousQuantity;

                    }

                }

                state.cartError =
                    error?.message ||
                    "Failed to update cart";

            }
        )


        // ==================================================
        // DELETE CART
        // ==================================================

        .addCase(
            deleteCart.pending,
            (state) => {

                state.cartDeleting = true;

                state.cartError = null;

            }
        )

        .addCase(
            deleteCart.fulfilled,
            (state, action) => {

                state.cartDeleting = false;

                state.cart = action.payload;

            }
        )

        .addCase(
            deleteCart.rejected,
            (state, action) => {

                state.cartDeleting = false;

                state.cartError =
                    action.payload;

            }
        )


        // ==================================================
        // CLEAR CART
        // ==================================================

        .addCase(
            clearCart.pending,
            (state) => {

                state.cartClearing = true;

                state.cartError = null;

            }
        )

        .addCase(
            clearCart.fulfilled,
            (state, action) => {

                state.cartClearing = false;

                state.cart = action.payload;

            }
        )

        .addCase(
            clearCart.rejected,
            (state, action) => {

                state.cartClearing = false;

                state.cartError =
                    action.payload;

            }
        );

    }

});


export const {
    updateQuantityOptimistic,
    rollbackQuantity
} = cartSlice.actions;


export default cartSlice.reducer;