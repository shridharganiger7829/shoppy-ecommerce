import { useDispatch , useSelector } from "react-redux"
import { getDashboardStats } from "../redux/adminSlice"
import { useEffect } from "react";
import "../styles/AdminDashboard.css"
import { useNavigate } from "react-router-dom";

export default function AdminDashboard(){
const dispatch=useDispatch();

const navigate=useNavigate();

const {dashboardStats , loading , error}=useSelector((state)=>state.admin)

useEffect(()=>{
    dispatch(getDashboardStats())
},[dispatch])

if (loading) {
    return (
        <div className="admin-dashboard-loading">
            Loading dashboard...
        </div>
    );
}

if (error) {
    return (
        <div className="admin-dashboard-error">
            <h2>Something went wrong</h2>
            <p>{error}</p>
        </div>
    );
}

if (!dashboardStats) {
      return null;
 }

    return(
    
    <div className="admin-dashboard-header">

    <div className="admin-dashboard-top">

        <h1>Admin Dashboard</h1>

        <div className="admin-dashboard-actions">

            <button
                onClick={() => navigate("/admin/products")}
                className="manage-products-btn"
            >
                Manage Products
            </button>

            <button
                onClick={() => navigate("/admin/users")}
                className="all-users-btn"
            >
                All Users
            </button>

        </div>

    </div>


    <div className="admin-dashboard-stats">

        <div onClick={() => navigate("/admin/users")}>
            <h3>Total Users</h3>
            <p>{dashboardStats.totalUsers}</p>
        </div>

        <div onClick={() => navigate("/admin/products")}>
            <h3>Total Products</h3>
            <p>{dashboardStats.totalProducts}</p>
        </div>

        <div>
            <h3>Total Orders</h3>
            <p>{dashboardStats.totalOrders}</p>
        </div>

        <div>
            <h3>Pending Orders</h3>
            <p>{dashboardStats.PendingOrders}</p>
        </div>

        <div>
            <h3>Delivered Orders</h3>
            <p>{dashboardStats.DeliveredOrders}</p>
        </div>

        <div>
            <h3>Cancelled Orders</h3>
            <p>{dashboardStats.CancelledOrders}</p>
        </div>

    </div>

</div>
);
     
    
}