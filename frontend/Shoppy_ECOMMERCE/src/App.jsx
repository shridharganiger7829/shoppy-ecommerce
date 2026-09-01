import React from "react";
import {BrowserRouter , Routes , Route} from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import RegisterPage from "./pages/RegisterPage.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";

export default function App(){
   return(
    <>
       <BrowserRouter>
         <Navbar />

        <Routes>
          <Route path="/"  element={<HomePage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/verify-otp" element={<VerifyOtp />}/>
        </Routes>
        
         <Footer />

       
       </BrowserRouter>
    </>
   )
}