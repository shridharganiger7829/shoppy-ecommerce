import {useDispatch , useSelector} from "react-redux"
import { useState } from "react"
import { loginUser } from "../redux/authSlice"
import "../styles/Login.css"

export default function Login(){
    const dispatch=useDispatch();

    const {loading , error , loginSuccess}=useSelector((state)=>state.auth)

    const [formData , setformData]=useState({
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setformData({
            ...formData ,
             [e.target.name]:e.target.value })
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        dispatch(loginUser(formData))
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

          {loginSuccess && (
            <p className="login-success">
              Login successful!
            </p>
          )}

        </form>
      </div>
    </div>
    </>
    )
}