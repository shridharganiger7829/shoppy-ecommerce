import { Link , useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css"

export default function Navbar(){

  const {user , logout}=useAuth();
  const navigate=useNavigate();

  const handleLogOut=async ()=>{
    await logout();

    navigate("/login")
  }

    return(
        <>
          <div className="navbar">
             <div className="navbar-left">
               <Link to="/" className="logo">
                 <img src="/ShoppyImage.jpg" alt="Shoppy" />
                 <span>Shoppy</span>
               </Link>
             </div>

             <div className="navbar-right">
               <Link to="/">Shop</Link>

               {user && (
                <Link to="/cart">Cart</Link>
               )}

               {!user && (
                <Link to="/register">Register</Link>
               )}

               {user && (
                <Link to="/profile">Profile</Link>
               )}

               {user && (
                <Link to="/orders">Orders</Link>
               )}

               {user?.role==="admin" && (
                <Link to="/admin">Admin Dashboard</Link>
               )}

               {!user ? (
                <Link to="/login">Login</Link>
               ) : (
                 <button onClick={handleLogOut}>Logout</button>
               )}

               
             </div>
          </div>
        
        </>
    )
}