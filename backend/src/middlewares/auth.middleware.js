import {User} from "../models/user.model.js"
import asyncHandler from "../utils/asynchandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"

const JWTVERIFY = asyncHandler(async (req , res , next)=>{
try {
    
        const token=req.cookies?.accessToken ||  req.header("Authorization")?.replace("Bearer "," ");
    
        if(!token){
            throw new ApiError(400,"Unauthorized token request")
        }
    
        const decoded_token=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const user=await User.findById(decoded_token._id).select("-password -refreshToken");
        
        if(!user){
            throw new ApiError(404,"Invalid Token Secret")
        }
    
        req.user=user;

        next();
} catch (error) {
        throw new ApiError(404,error?.message,"Error in Verifying the Access Token")
}

})

export default JWTVERIFY;