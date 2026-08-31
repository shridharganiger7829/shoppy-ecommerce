import "../styles/ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image?.[0]}
        alt={product.name}
      />

      <h3>{product.name}</h3>

      <p>{product.description}</p>

      <p className="price">₹{product.price}</p>

      <p className="stock">
        Stock: {product.stock}
      </p>
    </div>
  );
}

export default ProductCard;