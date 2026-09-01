import { Link } from "react-router-dom";
import "../styles/navbar.css"

export default function Navbar(){
    return(
        <>
          <div className="navbar">
             <div className="navbar-left">
               <Link to="/" className="logo">
                 <img src="/ShoppyImage.png" alt="Shoppy" />
                 <span>Shoppy</span>
               </Link>
             </div>

             <div className="navbar-right">
               <Link to="/">Shop</Link>
               <Link to="/cart">Cart</Link>
               <Link to="/register">Register</Link>
               <Link to="/profile">Profile</Link>
             </div>
          </div>
        
        </>
    )
}