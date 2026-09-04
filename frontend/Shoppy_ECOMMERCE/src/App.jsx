import React from "react";
import {BrowserRouter , Routes , Route} from "react-router-dom"
import HomePage from "./pages/HomePage.jsx"
import Navbar from "./components/Navbar.jsx"
import Footer from "./components/Footer.jsx"
import RegisterPage from "./pages/RegisterPage.jsx";
import VerifyOtp from "./pages/VerifyOtp.jsx";
import Login from "./pages/LoginPage.jsx";
import Profile from "./pages/Profile.jsx";
import Orders from "./pages/Orders.jsx";
import Cart from "./pages/Cart.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";


import ProtectedRoute from "./Routes/ProtectedRoute.jsx";
import AdminRoute from "./Routes/AdminRoute.jsx";
import AddProduct from "./pages/AddProduct.jsx";
import AdminProducts from "./pages/AdminProducts.jsx";
import EditProduct from "./pages/EditProduct.jsx";
import AdminUsers from "./pages/AdminUsers.jsx";

export default function App(){
   return(
    <>
       <BrowserRouter>
         <Navbar />

        <Routes>
          <Route path="/"  element={<HomePage />}/>
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/verify-otp" element={<VerifyOtp />}/>
          <Route path="/login" element={<Login />}/>

          

          //Protected Routes
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/orders"  element={<Orders />}/>
            <Route path="/cart"  element={<Cart />}/>
            <Route path="/product/:id"  element={<ProductDetails />}/>
          </Route>

          //AdminRoute
          <Route element={<AdminRoute />} >
            <Route  path="/admin" element={<AdminDashboard />} />
            <Route  path="/admin/products/add"  element={<AddProduct />} />
            <Route path="/admin/products"  element={<AdminProducts />} />
            <Route  path="/admin/products/edit/:id" element={<EditProduct />}/>
            <Route path="/admin/users"  element={<AdminUsers />}/>
          </Route>

        </Routes>
        
         {/* <Footer /> */}

       
       </BrowserRouter>
    </>
   )
}