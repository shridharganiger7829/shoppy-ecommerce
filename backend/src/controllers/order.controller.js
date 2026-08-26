import { ApiError } from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js"
import asyncHandler from "../utils/asynchandler.js";
import { Products } from "../models/product.model.js";
import { Order } from "../models/order.model.js";

export const createOrder=asyncHandler(async (req , res)=>{
    const { productId , quantity , shippingAddress} = req.body;

    if(!productId || !quantity || !shippingAddress){
        throw new ApiError(400 , "ProductId and quantity and shipping adress are required");
    }

    const userId=req.user._id;

    const product=await Products.findById(productId);

    if(!product){
         throw new ApiError(400 ,"Product is not found");
    }

    if(product.stock < quantity){
        throw new ApiError(400 , "Not enough stock available");
    }

    const totalprice=product.price * quantity;

     product.stock -= quantity;

     const createdOrder=await Order.create({
        user:userId,
        product:productId,
        price:product.price,
        totalprice,
        quantity,
        shippingAddress
     })

     await product.save();

     return res.status(200).json(
        new ApiResponse(200 , createdOrder , "Order is created successfully")
     )

})


export const getMyOrders=asyncHandler(async (req , res)=>{
    const userId=req.user._id;

    const myorders=await Order.find({user:userId}).populate("product");

    return res.status(200).json(
        new ApiResponse(200 , myorders , "Here is your all orders")
    )
})

export const getorders=asyncHandler(async (req , res)=>{

    const orders=await Order.find();

    return res.status(200).json(
        new ApiResponse(200 , orders , "All orders are displayed")
    )
})


export const updateOrderStatus=asyncHandler(async (req , res)=>{
    const {id}=req.params;
    const { status }=req.body;

    

    const order=await Order.findByIdAndUpdate(
        id,
      { status: status },
      {
        returnDocument: 'after', 
        runValidators: true 
       }
    )

    if(!order){
        throw new ApiError(400 , "Order is not found")
    }

    return res.status(200).json(
        new ApiResponse(200 ,order, "Status is updated successfully")
    )

})


export const cancelMyOrder=asyncHandler(async (req , res)=>{
    const {id}=req.params;

    const order=await Order.findById(id);
    
     if (!order) {
        throw new ApiError(404, "Order not found");
    }
    
    if (!order.user.equals(req.user._id)){
        throw new ApiError(400 , "This order is not belongs to you")
    }

    if (order.status === "Shipped" || order.status === "Delivered"){
        throw new ApiError(400 , `Order cannot be cancelled because it is ${order.status}`)
    }

     const CancelOrder=await Order.findByIdAndUpdate(
        id,
      { status: "Cancelled"},
      {
        returnDocument: 'after', 
        runValidators: true 
       }
    )

    return res.status(200).json(
        new ApiResponse(200,CancelOrder,"Order is cancelled successfully")
    )
})