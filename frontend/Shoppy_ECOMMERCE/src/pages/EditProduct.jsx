import { useState , useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { getProductById , updateProduct } from "../redux/productSlice";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/EditProduct.css"

export default function EditProduct(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const {id}=useParams();

    const {loading , error}=useSelector((state)=>state.products)

    const [formData, setFormData]=useState({
        name:"",
        description:"",
        category:"",
        price:"",
        stock:""
    })
    const [image , setImage]=useState(null);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

   const handleImageChange = (e) => {
    setImage(e.target.files[0]);
};

   useEffect(() => {

    const loadProduct = async () => {

        const result = await dispatch(
            getProductById(id)
        );

        if (getProductById.fulfilled.match(result)) {

            const product = result.payload;

            setFormData({
                name: product.name,
                description: product.description,
                category: product.category,
                price: product.price,
                stock: product.stock
            });
        }
    };

    loadProduct();

}, [dispatch, id]);

    const handleSubmit=async (e)=>{
        e.preventDefault();

        const data=new FormData();

       data.append("name", formData.name);
       data.append("description", formData.description);
       data.append("category", formData.category);
       data.append("price", formData.price);
       data.append("stock", formData.stock);

        if (image) {
        data.append("image", image);
        }

        const result=await dispatch(updateProduct({id , formData:data}));

        if(updateProduct.fulfilled.match(result)){
            alert("Product updated successfully");

            navigate("/admin/products")
        }
    }

     
    return (

        <div className="edit-product-page">

            <h1>Edit Product</h1>


            {error && (
                <p className="error">
                    {error}
                </p>
            )}


            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="name"
                    placeholder="Product name"
                    value={formData.name}
                    onChange={handleChange}
                />


                <textarea
                    name="description"
                    placeholder="Product description"
                    value={formData.description}
                    onChange={handleChange}
                />


                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                />


                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                />


                <input
                    type="number"
                    name="stock"
                    placeholder="Stock"
                    value={formData.stock}
                    onChange={handleChange}
                />


                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                />


                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Updating..."
                        : "Update Product"
                    }
                </button>

            </form>

        </div>

    );
}