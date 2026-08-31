import {useDispatch , useSelector} from "react-redux"
import { useEffect } from "react"
import { getProducts } from "../redux/productSlice"
import ProductCard from "./productCard"
import "../styles/ProductList.css"

const ProductList=()=>{
    const dispatch=useDispatch();

    const {products , loading , error }=useSelector((state)=>state.products)

    useEffect(()=>{
        dispatch(getProducts())
    } , [dispatch])

    if(loading){
       return  <p>Loading Products</p>
    }

    if(error){
       return  <p>Failed to fetch products</p>
    }

    return(<>
       <section className="product-list">
    <h2>Featured Products</h2>

    <div className="products-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
        />
      ))}
    </div>
  </section>
    </>)
}

export default ProductList