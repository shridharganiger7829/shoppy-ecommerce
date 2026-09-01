import {useDispatch , useSelector} from "react-redux"
import { registerUser } from "../redux/authSlice"
import { useState } from "react";
import "../styles/Register.css";

const RegisterPage=()=>{
    const dispatch=useDispatch();

    const { loading , error , registerSuccess}=useSelector((state)=>state.auth);

    const [formData,setformData]=useState({
        name:"",
        email:"",
        password:""
    })

    const handleChange=(e)=>{
        setformData({
            ...formData ,
            [e.target.name]:e.target.value, 
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault(),

        dispatch(registerUser(formData));
    }

    return(<>
       <div className="register-page">
  <div className="register-container">

    <h1>Create Account</h1>

    <p className="register-subtitle">
      Join Shoppy today
    </p>

    <form className="register-form" onSubmit={handleSubmit}>
      <input type="text" 
      name="name"
      placeholder="Enter your name"
      value={formData.name}
      onChange={handleChange}
      />

      <input type="email"
      name="email"
      placeholder="Enter your email"
      value={formData.email}
      onChange={handleChange} />

      <input type="text"
      name="password"
      placeholder="Enter your password"
      value={formData.password}
      onChange={handleChange} />

      <button type="submit" disabled={loading}>
        {loading ? "Creating Account..." : "Register"}
      </button>

      {error && <p className="register-error">{error}</p>}

      {registerSuccess && <p className="register-success">Otp has been sent to your email</p>}

    </form>
  </div>
</div>
    </>)
}

export default RegisterPage