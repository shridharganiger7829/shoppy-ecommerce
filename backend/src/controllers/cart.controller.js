import { Cart } from "../models/cart.model.js";
import asyncHandler from "../utils/asynchandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import  {Products} from "../models/product.model.js";
import {User} from "../models/user.model.js";

export const addToCart=asyncHandler(async (req ,res)=>{
    const {productId , quantity}=req.body;

    if(!productId || !quantity){
        throw new ApiError(404 , "productid and quantity are both required")
    }

    const product=await Products.findById(productId);

    if(!product){
        throw new ApiError(400,"Product was not found")
    }

    if(product.stock < quantity){
        throw new ApiError(400, "Not enough stock available")
    }

    let cart=await Cart.findOne({user:req.user._id});

    if(!cart){
        cart=await Cart.create({
            user:req.user._id,
            items:[{
                product:productId,
                quantity:quantity
            }
        ]
        });
    }else{
        const existingProduct= cart.items.find((item)=>item.product.toString()===productId);
        
        if (existingProduct) {

    const newQuantity = existingProduct.quantity + quantity;

    if (newQuantity > product.stock) {
        throw new ApiError(
            400,
            "Not enough stock available"
        );
    }

    existingProduct.quantity = newQuantity;

} else {

    cart.items.push({
        product: productId,
        quantity
    });
}

        await cart.save();
    }

    const populatedCart = await Cart.findById(cart._id).populate("items.product");

    return res.status(200).json(
        new ApiResponse(200 , populatedCart ,"Product is added to the cart successfully")
    )

})


export const getCart=asyncHandler(async ( req , res)=>{
    const cart=await Cart.findOne({user:req.user._id}).populate("items.product");

    if(!cart){
        throw new ApiError(400,"cart is not found")
    }

    return res.status(200).json(
        new ApiResponse(200, cart , "Here is your cart")
    )
})



export const updateCart=asyncHandler(async (req , res)=>{
    const {quantity}= req.body;
    const {productId}=req.params;

    if(quantity === undefined || quantity <1){
        throw new ApiError(400 , "Quantity must be atleast 1")
    }

    const cart=await Cart.findOne({user:req.user._id});

    if(!cart){
        throw new ApiError(404,"Cart was not found")
    }

    const cartItem=cart.items.find((item)=>item.product.toString()===productId);

    if(!cartItem){
        throw new ApiError(400,"Cart Item was not found")
    }

    const product=await Products.findById(productId);

    if(product.stock < quantity){
        throw new ApiError(400 , "Not Enough stock is available");
    }
    
    cartItem.quantity=quantity;
   
    await cart.save();

    return res.status(200).json(
        new ApiResponse(200 , cart , "Cart is updated successfully")
    )
    
})


export const deleteCart=asyncHandler(async (req ,res)=>{
    const {productId}=req.params;

    const cart=await Cart.findOne({user:req.user._id});

    if(!cart){
         throw new ApiError(400 , "Cart is not found")
    }

    const productExists=cart.items.find((item)=>item.product.toString()===productId);

    if(!productExists){
        throw new ApiError(400 , "Product is not found")
    }

    cart.items=cart.items.filter((item)=>item.product.toString() !== productId);

    await cart.save();

    return res.status(200).json(
        new ApiResponse(200 , cart , "Product is deleted from the cart")
    )
})



export const clearCart=asyncHandler(async (req , res)=>{
    const cart=await Cart.findOne({user:req.user._id});

    if(!cart){
        throw new ApiError(400 , "Cart is not found")
    }

    cart.items=[];

    await cart.save()

    return res.status(200).json(
        new ApiResponse(200 , cart , "Cart is Cleared")
    )
})