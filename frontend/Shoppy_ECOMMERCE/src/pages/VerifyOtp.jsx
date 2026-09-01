import { useState } from "react";
import { useDispatch , useSelector } from "react-redux";
import { verifyOtp } from "../redux/authSlice";
import "../styles/VerifyOtp.css"

export default function VerifyOtp(){
    const dispatch=useDispatch();

    const {loading , error ,otpVerified}=useSelector((state)=>state.auth);
    
    const [email , setEmail]=useState("");
    const [otp , setOtp]=useState("");

    const handleSubmit=(e)=>{
        e.preventDefault();

        dispatch(verifyOtp({
            email , otp
        }))
    }


    return(<>
        <div className="otp-page">
        <div className="otp-container">

        <h1>Verify Your Email</h1>

        <p className="otp-subtitle">
          Enter the OTP sent to your email
        </p>

        <form className="otp-form" onSubmit={handleSubmit}>

         <input 
         type="email"
         name="email"
         placeholder="Enter your email for verification"
         value={email}
         onChange={(e)=>setEmail(e.target.value)} />

         <input type="text"
         name="otp"
         placeholder="Enter OTP here"
         value={otp}
         onChange={(e)=>setOtp(e.target.value)} />

         <button type="submit" disabled={loading}>
            {loading ? "Verifying..." : "Verify OTP"}
         </button>

         {error && <p className="otp-error">{error}</p>}

         {otpVerified && <p className="otp-success">Registration Successfull✅</p>}

        </form>
      </div>
    </div>
    </>)
}