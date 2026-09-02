// import {useDispatch , useSelector} from "react-redux"
// import { loginUser } from "../redux/authSlice"

import { useState } from "react"
import "../styles/Login.css"
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login(){
    // const dispatch=useDispatch();

    // const {loading , error , loginSuccess}=useSelector((state)=>state.auth)

   const {login}=useAuth();

   const navigate=useNavigate();

    const [formData , setformData]=useState({
        email:"",
        password:""
    })

    const [error , setError]=useState("");
    const [loading , setLoading]=useState(false);

    const handleChange=(e)=>{
        setformData({
            ...formData ,
             [e.target.name]:e.target.value })
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        
        setError("");
        setLoading(true);

        try {
          const response=await fetch("http://localhost:8000/user/login" , {
            method:"POST",
            
            headers:{
              "Content-Type":"application/json"
            },
            credentials:"include",
            body:JSON.stringify(formData)

          })

          const result=await response.json();

          if(!response.ok){
            throw new Error(result.message || "Login Failed")
          }

          login(result.data.loggedInUser);

          navigate("/")

        } catch (error) {
            setError(error.message)
        }finally{
          setLoading(false);
        }
    }

    return(
    <>
     <div className="login-page">
      <div className="login-container">

        <h1>Welcome Back</h1>

        <p>Login to your Shoppy account</p>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

        </form>
      </div>
    </div>
    </>
    )
}