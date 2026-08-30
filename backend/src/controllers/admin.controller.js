import { User } from "../models/user.model.js";
import { Products } from "../models/product.model.js";
import { Order } from "../models/order.model.js";
import asyncHandler from "../utils/asynchandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const  getDashboardstats=asyncHandler(async (req , res)=>{
    const totalUsers=await User.countDocuments();

    const totalProducts=await Products.countDocuments();

    const totalOrders=await Order.countDocuments();

    const PendingOrders=await Order.countDocuments({status:"Pending"})

    const DeliveredOrders=await Order.countDocuments({status:"Delivered"})

    const CancelledOrders=await Order.countDocuments({status:"Cancelled"})

    return res.status(200).json(
        new ApiResponse(200 , {
            totalUsers, totalProducts , totalOrders , PendingOrders , DeliveredOrders , CancelledOrders
        } ,
         "Here is your total documents")
    )
})