import { Products } from "../models/product.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asynchandler.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js"

export const getProducts=asyncHandler(async (req , res)=>{
    const products=await Products.find();

    return res.status(200)
    .json(
        new ApiResponse(200,products,"All Products are displayed")
    )
})


export const getProductById=asyncHandler(async (req,res)=>{
    const product=await Products.findById(req.params.id);

    if(!product){
        throw new ApiError(400,"Product not found by this ID")
    }

    return res.status(200)
    .json(
        new ApiResponse(200,product,"Here is your product")
    )
})




export const createProduct=asyncHandler(async (req , res)=>{
    const {name,description,category,price,stock}=req.body;

    if(
        [name,description,category].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(404,"All fields are required");
    }

    if(price===undefined || stock===undefined){
        throw new ApiError(404,"price and stock fields are required");
    }
    
    if (!req.file) {    //if no image is uploaded then req.file is become undefined so first check whether req.file is there or not
    throw new ApiError(400, "Image file is missing");
    }

    const imageLocalPath=req.file.path;

    if(!imageLocalPath){
        throw new ApiError(400,"Image file is missing");
    }

    const image=await uploadOnCloudinary(imageLocalPath);
    
    if(!image || !image.url){
        throw new ApiError(400,"Error in uploading image to cloudinary");
    }

    const product=await Products.create({
        name,
        description,
        category,
        price,
        stock,
        image:image.url,

    })

    const createdProduct=await Products.findById(product._id);

    if(!createdProduct){
        throw new ApiError(400,"Error in creating product")
    }

    return res
           .status(200)
           .json(
            new ApiResponse(200,createdProduct,"Product is Created Successfully")
           )

})


export const UpdateProduct=asyncHandler(async (req , res)=>{
     const {id}=req.params;

     const {name , description , category , price , stock} = req.body;

     const product=await Products.findById(id);

     if(!product){
        throw new ApiError(400,"Product is not found");
     }

     if(req.file){
        const imagePath=req.file.path

        if(!imagePath){
            throw new ApiError(400 , "Image file is missing");
        }

        const image=await uploadOnCloudinary(imagePath);

        if(!image || !image.url){
            throw new ApiError(400,"Error in uploading to cloudinary");
        }

        product.image=image.url;
        
     }

     if(name !== undefined)  product.name=name;

     if(description !== undefined)   product.description=description;

     if(category !== undefined)    product.category=category;

     if(price !== undefined)    product.price=price;

     if(stock !== undefined)   product.stock=stock;

     product.save();

     return res.status(200)
     .json(
        new ApiResponse(200 , product , "Product is updated successfully")
     )
})



export const deleteProduct=asyncHandler(async (req ,  res)=>{
    const {id}=req.params;

    const product=await Products.findById(id);

    if(!product){
        throw new ApiError(400 , "Product is not found");
    }

    await Products.findByIdAndDelete(id);

    return res.status(200).json(
        new ApiResponse(200 , {}, "Product is deleted successfully")
    )
})