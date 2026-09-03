 import {useDispatch , useSelector} from "react-redux"
 import { getAllUsers } from "../redux/adminSlice";
 import { useEffect } from "react";
import "../styles/AdminUsers.css"
 export default function AdminUsers(){
    const dispatch=useDispatch();

    const {users , loading , error}=useSelector((state)=>state.admin)

    useEffect(()=>{
        dispatch(getAllUsers())
    } , [dispatch])

    if(loading){
        return( 
            <p>LOading....</p>
        )
    }

    if(error){
        return(
            <p>Something went wrong</p>
        )
    }
    return(
        <>
         
         <div className="admin-users-page">
         <h1>All Users</h1>

        <div className="admin-users-list">
        {users.map((user) => (
            <div className="admin-user-card" key={user._id}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <span className="user-role">{user.role}</span>
            </div>
            ))}
         </div>
       </div>

        </>
    )
 }