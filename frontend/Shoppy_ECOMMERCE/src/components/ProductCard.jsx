import "../styles/ProductCard.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {

    return (
        <Link
            to={`/product/${product._id}`}
            className="product-card"
        >

            <img
                src={product.image?.[0]}
                alt={product.name}
            />

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <p className="price">
                ₹{product.price}
            </p>

            <p className="stock">
                Stock: {product.stock}
            </p>

        </Link>
    );
}

export default ProductCard;