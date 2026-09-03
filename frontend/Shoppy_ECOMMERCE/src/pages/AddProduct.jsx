import { useState , useEffect } from "react";
import { useDispatch , useSelector } from "react-redux";
import { createProduct } from "../redux/productSlice";
import "../styles/AddProduct.css"
import { useNavigate } from "react-router-dom";

export default function AddProduct(){
    const dispatch=useDispatch();

    const navigate=useNavigate();

    const {loading , error}=useSelector((state)=>state.products)
    const [formData , setFormData]=useState({
        name:"",
        description:"",
        category:"",
        price:"",
        stock:"",
    })

    const [image , setImage]=useState(null);

    const handleChange=(e)=>{
        e.preventDefault();
        setFormData({
            ...formData , 
            [e.target.name]:e.target.value,
        })
    }

    const handleImageChange=(e)=>{
          setImage(e.target.files[0])
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();

        const data=new FormData();

        data.append("name",formData.name);
        data.append("description",formData.description);
        data.append("category",formData.category);
        data.append("price",formData.price);
        data.append("stock",formData.stock)
        data.append("image",image)

       

        const result=await dispatch(createProduct(data));

        navigate("/admin/products")

        if(createProduct.fulfilled.match(result)){
            alert("Product Created Successfully")
            setFormData({
               name:"",
               description:"",
               category:"",
               price:"",
               stock:"",
            });

            setImage(null);


        }
    }


    return(
    <>
       <div className="add-product-page">

            <h1>Add Product</h1>


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
                        ? "Creating..."
                        : "Add Product"
                    }

                </button>

            </form>

        </div>

    </>
    )
}