import mongoose from "mongoose"

const CartSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        unique:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Products",
                required:true
            },
            quantity:{
                type:Number,
                min:1,
                required:true
            }
        }
    ]
},
{
    timestamps:true,
})

export const Cart=mongoose.model("Cart",CartSchema);