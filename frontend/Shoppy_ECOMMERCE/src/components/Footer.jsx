import "../styles/footer.css"
import { Link } from "react-router-dom"

export default function Footer(){
    return(
        <>
         <div className="footer">
            <div className="footer-brand">
                  <h2>Shoppy</h2>
                  <p>Your simple and trusted shopping destination.</p>
            </div>
            
            <div className="footer-links">
                <Link to="/privacy">Privacy Policy</Link>
                <Link to="/terms">Terms & Conditions</Link>
                <Link to="/contact">Contact Us</Link>
            </div>

            <div className="footer-bottom">
                 <p>© 2026 Shoppy. All rights reserved.</p>
            </div>
         </div>
        </>
    )
}