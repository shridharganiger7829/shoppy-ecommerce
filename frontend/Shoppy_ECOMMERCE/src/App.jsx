import React from "react";
import {BrowserRouter , Routes , Route} from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"

export default function App(){
   return(
    <>
       <BrowserRouter>
         <Navbar />

        <Routes>
          <Route path="/"  element={<HomePage />}/>
        </Routes>
        
         <Footer />

       
       </BrowserRouter>
    </>
   )
}