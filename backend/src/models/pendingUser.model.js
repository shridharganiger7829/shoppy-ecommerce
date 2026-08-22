import mongoose from "mongoose"

const pendingSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true
    },
    otpExpiry:{
        type:Date,
        required:true,
    }
},
{
    timestamps:true,
})

export const pendinguser=mongoose.model("pendinguser",pendingSchema);