import { useEffect, useState } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import { useParams } from "react-router-dom";

import {
    getProductById
} from "../redux/productSlice.js";

import { addToCart } from "../redux/cartSlice.js";

import "../styles/ProductDetails.css"

const ProductDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

   const [quantity , setQuantity]=useState(1);

    const {
        selectedProduct,
        loading,
        error
    } = useSelector(
        (state) => state.products
    );

    const {cartLoading , cartError}=useSelector((state)=>state.cart);


    // GET PRODUCT
    useEffect(() => {

        dispatch(
            getProductById(id)
        );

    }, [dispatch, id]);


    // LOADING
    if (loading) {

        return (
            <div>
                Loading product...
            </div>
        );

    }


    // ERROR
    if (error) {

        return (
            <div>
                {error}
            </div>
        );

    }


    // NO PRODUCT
    if (!selectedProduct) {

        return (
            <div>
                Product not found
            </div>
        );

    }

    const increaseQuantity=()=>{
        if(quantity<selectedProduct.stock){
            setQuantity(quantity+1);
        }
    }

    const decreaseQuantity=()=>{
        if(quantity>1){
            setQuantity(quantity-1);
        }
    }

    const handleAddCart=async ()=>{
        const result=await dispatch(addToCart({
            productId:selectedProduct._id,
            quantity:quantity
        }))

        if(addToCart.fulfilled.match(result)){
            alert("Product added to the cart")
        }
    }


    return (

       <div className="product-details">

    <img
        src={selectedProduct.image}
        alt={selectedProduct.name}
    />

    <div className="product-details-info">

        <h1>{selectedProduct.name}</h1>

        <p>{selectedProduct.description}</p>

        <p className="product-price">
            ₹{selectedProduct.price}
        </p>

        <p>
            Category: {selectedProduct.category}
        </p>

        <p className="product-stock">
    Stock: {selectedProduct.stock}
</p>

<div className="quantity-control">

    <button
        onClick={decreaseQuantity}
        disabled={quantity === 1}
    >
        -
    </button>

    <span>{quantity}</span>

    <button
        onClick={increaseQuantity}
        disabled={quantity === selectedProduct.stock}
    >
        +
    </button>

</div>

<button
    className="add-to-cart-btn"
    onClick={handleAddCart}
    disabled={cartLoading}
>
    {cartLoading
        ? "Adding..."
        : "Add to Cart"
    }
</button>

{cartError && (
    <p className="cart-error">
        {cartError}
    </p>
)}

    </div>

</div>
    );

};


export default ProductDetails;