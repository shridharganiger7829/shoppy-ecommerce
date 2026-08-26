import mongoose from "mongoose";

const OrderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Products",
        required:true,
    },
    quantity:{
        type:Number,
        required:true
    },
    totalprice:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    shippingAddress: {
            fullName: String,
            phone: String,
            address: String,
            city: String,
            state: String,
            pincode: String
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Confirmed",
                "Shipped",
                "Delivered",
                "Cancelled"
            ],
            default: "Pending"
        }

},{
    timestamps:true
})

export const Order=mongoose.model("Order",OrderSchema);