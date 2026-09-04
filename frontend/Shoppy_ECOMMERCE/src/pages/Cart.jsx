import { useEffect } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    getCart,
    updateCart,
    updateQuantityOptimistic,
    deleteCart,
    clearCart
} from "../redux/cartSlice.js";

import "../styles/Cart.css";


export default function Cart() {

    const dispatch = useDispatch();


    const {
        cart,
        cartLoading,
        cartUpdating,
        cartDeleting,
        cartClearing,
        cartError
    } = useSelector(
        (state) => state.cart
    );


    // ==================================================
    // GET CART
    // ==================================================

    useEffect(() => {

        dispatch(getCart());

    }, [dispatch]);


    // ==================================================
    // INCREASE QUANTITY
    // ==================================================

    const increaseQuantity = (item) => {

        const currentQuantity =
            item.quantity;

        const newQuantity =
            currentQuantity + 1;


        if (
            newQuantity >
            item.product.stock
        ) {

            return;

        }


        // ----------------------------------------------
        // 1. CHANGE UI IMMEDIATELY
        // ----------------------------------------------

        dispatch(
            updateQuantityOptimistic({
                productId:
                    item.product._id,

                quantity:
                    newQuantity
            })
        );


        // ----------------------------------------------
        // 2. UPDATE DATABASE
        // ----------------------------------------------

        dispatch(
            updateCart({

                productId:
                    item.product._id,

                quantity:
                    newQuantity,

                previousQuantity:
                    currentQuantity

            })
        );

    };


    // ==================================================
    // DECREASE QUANTITY
    // ==================================================

    const decreaseQuantity = (item) => {

        const currentQuantity =
            item.quantity;

        const newQuantity =
            currentQuantity - 1;


        if (newQuantity < 1) {

            return;

        }


        // ----------------------------------------------
        // 1. CHANGE UI IMMEDIATELY
        // ----------------------------------------------

        dispatch(
            updateQuantityOptimistic({

                productId:
                    item.product._id,

                quantity:
                    newQuantity

            })
        );


        // ----------------------------------------------
        // 2. UPDATE DATABASE
        // ----------------------------------------------

        dispatch(
            updateCart({

                productId:
                    item.product._id,

                quantity:
                    newQuantity,

                previousQuantity:
                    currentQuantity

            })
        );

    };


    // ==================================================
    // DELETE PRODUCT
    // ==================================================

    const handleDelete = async (
        productId
    ) => {

        const result =
            await dispatch(
                deleteCart(productId)
            );


        if (
            deleteCart.fulfilled.match(
                result
            )
        ) {

            alert(
                "Product removed from cart"
            );

        }

    };


    // ==================================================
    // CLEAR CART
    // ==================================================

    const handleClearCart = async () => {

        const result =
            await dispatch(
                clearCart()
            );


        if (
            clearCart.fulfilled.match(
                result
            )
        ) {

            alert(
                "Cart cleared successfully"
            );

        }

    };


    // ==================================================
    // INITIAL LOADING ONLY
    // ==================================================

    if (
        cartLoading &&
        !cart
    ) {

        return (
            <div className="cart-loading">
                Loading cart...
            </div>
        );

    }


    // ==================================================
    // ERROR
    // ==================================================

    if (
        cartError &&
        !cart
    ) {

        return (

            <div className="cart-error">

                <h2>
                    Something went wrong
                </h2>

                <p>
                    {cartError}
                </p>

            </div>

        );

    }


    // ==================================================
    // EMPTY CART
    // ==================================================

    if (
        !cart ||
        cart.items.length === 0
    ) {

        return (

            <div className="empty-cart">

                <h2>
                    Your Cart is Empty
                </h2>

                <p>
                    Add some products to your cart.
                </p>

            </div>

        );

    }


    // ==================================================
    // CART PAGE
    // ==================================================

    return (

        <div className="cart-page">


            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="cart-header">

                <h1>
                    Your Cart
                </h1>


                <button
                    className="clear-cart-btn"
                    onClick={
                        handleClearCart
                    }
                    disabled={cartClearing}
                >

                    {cartClearing
                        ? "Clearing..."
                        : "Clear Cart"
                    }

                </button>

            </div>



            {/* ==========================================
                ERROR MESSAGE
            ========================================== */}

            {cartError && (

                <div className="cart-inline-error">

                    {cartError}

                </div>

            )}



            {/* ==========================================
                CART ITEMS
            ========================================== */}

            <div className="cart-items">


                {cart.items.map(
                    (item) => (

                        <div
                            className="cart-item"
                            key={item._id}
                        >


                            {/* IMAGE */}

                            <img
                                src={
                                    Array.isArray(
                                        item.product.image
                                    )
                                        ? item.product.image[0]
                                        : item.product.image
                                }
                                alt={
                                    item.product.name
                                }
                            />



                            {/* PRODUCT INFO */}

                            <div className="cart-item-info">


                                <h2>
                                    {
                                        item.product.name
                                    }
                                </h2>


                                <p className="cart-description">

                                    {
                                        item.product.description
                                    }

                                </p>


                                <p className="cart-category">

                                    Category:
                                    {" "}
                                    {
                                        item.product.category
                                    }

                                </p>


                                <p className="cart-price">

                                    ₹
                                    {
                                        item.product.price
                                    }

                                </p>



                                {/* ==================================
                                    QUANTITY
                                ================================== */}

                                <div className="quantity-section">


                                    <span>
                                        Quantity
                                    </span>


                                    <div className="quantity-controls">


                                        <button
                                            onClick={() =>
                                                decreaseQuantity(
                                                    item
                                                )
                                            }

                                            disabled={
                                                item.quantity <=
                                                1
                                            }
                                        >
                                            −
                                        </button>


                                        <span>
                                            {
                                                item.quantity
                                            }
                                        </span>


                                        <button
                                            onClick={() =>
                                                increaseQuantity(
                                                    item
                                                )
                                            }

                                            disabled={
                                                item.quantity >=
                                                item.product.stock
                                            }
                                        >
                                            +
                                        </button>


                                    </div>

                                </div>



                                <p className="cart-stock">

                                    Available Stock:
                                    {" "}
                                    {
                                        item.product.stock
                                    }

                                </p>



                                {/* REMOVE */}

                                <button
                                    className="remove-cart-btn"

                                    onClick={() =>
                                        handleDelete(
                                            item.product._id
                                        )
                                    }

                                    disabled={
                                        cartDeleting
                                    }
                                >

                                    {cartDeleting
                                        ? "Removing..."
                                        : "Remove"
                                    }

                                </button>


                            </div>


                        </div>

                    )
                )}

            </div>


        </div>

    );

}