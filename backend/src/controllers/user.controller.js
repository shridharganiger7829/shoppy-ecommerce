
import {User} from '../models/user.model.js'
import asyncHandler from '../utils/asynchandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import JWTVERIFY from '../middlewares/auth.middleware.js'
import jwt from "jsonwebtoken";

const generateAccessandRefreshToken=async(userId)=>{
  try {

    const user=await User.findById(userId);
    const AccessToken=user.generateAccessToken();
    const RefreshToken=user.generateRefreshToken();

    user.refreshToken = RefreshToken;
    user.save({validateBeforeSave:false});
    return {AccessToken , RefreshToken};

  } catch (error) {
     console.log("Error is : ",error);
     throw new ApiError(500,"Error in generating Access and Refresh Token")
  }
}


export const registerUser=asyncHandler( async (req , res)=>{
      const {name,email,password}=req.body;

      if(
        [name,email,password].some((field)=>field?.trim()==="")
      ){
        throw new ApiError(400,"All fields are required")
      }

      const existedUser=await User.findOne({email});

      if(existedUser){
        throw new ApiError(400,"User Already found");
      }

      const user=await User.create({
        name,
        email,
        password,
      })

     const createdUser=await User.findById(user._id).select("-password");

     if(!createdUser){
      throw new ApiError(400,"Error in creating User")
     }

     return res.status(200).json(
      new ApiResponse(200,createdUser,"User created successfully")
     )
})


export const LoginUser=asyncHandler(async (req,res)=>{
    const {email,password}=req.body;

    if(!email){
      throw new ApiError(404,"Email is not entered");
    }

    if(!password){
      throw new ApiError(404,"Password is not entered");
    }

    const user=await User.findOne({email});

    if(!user){
      throw new ApiError(400,"User not registered");
    }

    const isPasswordCorrect=await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
      throw new ApiError(500,"Password is not correct");
    }
    
    const {AccessToken , RefreshToken}=await generateAccessandRefreshToken(user._id);

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken");

    const options={
      httpOnly:true,
      secure:true
    }

   return res
    .status(200)
    .cookie("accessToken", AccessToken, options)
    .cookie("refreshToken", RefreshToken, options)
    .json(
        new ApiResponse(
            200,
            {loggedInUser,AccessToken,RefreshToken},
            "User logged in Successfully"
        )
    );


})


export const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1
      }
    }
  )

  res.status(200)
    .clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
    })
    .clearCookie("refreshToken", {
      httpOnly: true,
      secure: true
    })
    .json(
      new ApiResponse(200, {}, "User logged Out Successfully")
    )

})


export const refreshAccessToken=asyncHandler(async (req , res)=>{

  const token=req.cookies?.refreshToken || req.header("Authorization")?.replace("Bearer ","");
   
  if(!token){
    throw new ApiError(400,"Unauthorized Refresh Token request");
  }

  const decoded_token=jwt.verify(token,process.env.REFRESH_TOKEN_SECRET);

  const user=await User.findById(decoded_token._id);
  
  const {AccessToken , RefreshToken}=await generateAccessandRefreshToken(user._id);

  const options={
    httpOnly:true,
    secure:true
    }

  return res
  .status(200)
  .cookie("accessToken",AccessToken,options)
  .cookie("refreshToken",RefreshToken,options)
  .json(
    new ApiResponse(200,{user,AccessToken,RefreshToken},"Access Token Refreshed Successfully")
  )
})




