
import {User} from '../models/user.model.js'
import asyncHandler from '../utils/asynchandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import JWTVERIFY from '../middlewares/auth.middleware.js'
import jwt from "jsonwebtoken";
import SendEmail from '../utils/SendEmail.js'
import { pendinguser } from '../models/pendingUser.model.js'
import { json } from 'express'

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



     const otp=Math.floor(100000 + Math.random() * 900000 ).toString();

     const otpExpiry=new Date(Date.now()+10*60*1000);

     await pendinguser.deleteOne({email});

     await pendinguser.create({
      name,
      email,
      password,
      otp,
      otpExpiry
     });


    await SendEmail(
        email,
        "Verify your email for Shoppy Registration",
        `
        <div>
            <h2>Email Verification</h2>

            <p>Hello ${name},</p>

            <p>Your OTP for registration is:</p>

            <h1>${otp}</h1>

            <p>This OTP will expire in 10 minutes.</p>

            <p>Please do not share this OTP with anyone.</p>
        </div>
        `
    );



     return res.status(200).json(
      new ApiResponse(200,{},"Otp has sent successfully to your email")
     )
})


export const verifyOtp=asyncHandler(async (req,res)=>{
    const {email,otp}=req.body;

    if(!email || !otp){
      throw new ApiError(400,"Email and otp are required");
    }

    const Pendiguser=await pendinguser.findOne({email});

    if(!Pendiguser){
      throw new ApiError(400,"Registration request not found");
    }

    if(Pendiguser.otpExpiry < new Date()){
      await pendinguser.deleteOne({email});
      
      throw new ApiError(400,"Otp has expired");

    }

    if(Pendiguser.otp !== otp){
      throw new ApiError(400,"Invalid otp");
    }


   const user=await User.create({
       name: Pendiguser.name,
       email: Pendiguser.email,
       password: Pendiguser.password
   })
   
   await pendinguser.deleteOne({email});
   
   const createdUser=await User.findById(user._id).select("-password -refreshToken")
    
   return res
   .status(201)
   .json(
    new ApiResponse(200,createdUser,"User Registered Successfully")
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
      throw new ApiError(401,"User not registered");
    }

    const isPasswordCorrect=await user.isPasswordCorrect(password);

    if(!isPasswordCorrect){
      throw new ApiError(401,"Password is not correct");
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


export const getCurrentUser=asyncHandler(async (req , res)=>{
  const userId=req.user._id;

  if(!userId) throw new ApiError(404 , "Invalid token request")

    const user=await User.findById(userId).select("-password  -refreshToken");

    return res.status(200).json(
      new ApiResponse(200 , user , "Current User fetched Successfully")
    )
})


export const Getallusers=asyncHandler(async (req,res)=>{
   const users=await User.find();
   return res.status(200).json(
    new ApiResponse(200,users,"All users are displayed")
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




