import { useEffect } from "react";

import {
    useDispatch,
    useSelector
} from "react-redux";

import { useParams } from "react-router-dom";

import {
    getProductById
} from "../redux/productSlice.js";

import "../styles/ProductDetails.css"

const ProductDetails = () => {

    const { id } = useParams();

    const dispatch = useDispatch();


    const {
        selectedProduct,
        loading,
        error
    } = useSelector(
        (state) => state.products
    );


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

        <button>
            Add to Cart
        </button>

    </div>

</div>
    );

};


export default ProductDetails;