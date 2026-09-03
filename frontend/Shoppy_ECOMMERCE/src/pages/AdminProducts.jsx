import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
    getProducts,
    deleteProduct
} from "../redux/productSlice";

import "../styles/AdminProducts.css";


export default function AdminProducts() {

    const dispatch = useDispatch();

    const { products, loading, error } = useSelector(
        (state) => state.products
    );


    useEffect(() => {

        dispatch(getProducts());

    }, [dispatch]);


    const handleDelete = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        dispatch(deleteProduct(id));
    };


    if (loading) {
        return <h2>Loading products...</h2>;
    }


    return (
        <div className="admin-products-page">

            <div className="admin-products-header">

                <h1>Manage Products</h1>

                <Link
                    to="/admin/products/add"
                    className="add-product-btn"
                >
                    + Add Product
                </Link>

            </div>


            {error && (
                <p className="admin-product-error">
                    {error}
                </p>
            )}


            <div className="admin-products-list">

                {products.map((product) => (

                    <div
                        className="admin-product-card"
                        key={product._id}
                    >

                        <img
                            src={product.image?.[0]}
                            alt={product.name}
                        />


                        <div className="admin-product-info">

                            <h3>
                                {product.name}
                            </h3>

                            <p>
                                Category: {product.category}
                            </p>

                            <p>
                                Price: ₹{product.price}
                            </p>

                            <p>
                                Stock: {product.stock}
                            </p>

                        </div>


                        <div className="admin-product-actions">

                            <Link
                                to={`/admin/products/edit/${product._id}`}
                                className="edit-btn"
                            >
                                Edit
                            </Link>


                            <button
                                className="delete-btn"
                                onClick={() =>
                                    handleDelete(product._id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}