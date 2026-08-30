import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
const app=express();

import UserRouter from './routes/user.route.js'
import ProductRouter from "./routes/product.route.js"
import OrderRouter from "./routes/order.route.js"
import CartRouter from "./routes/cart.route.js"
import AdminRouter from "./routes/admin.route.js"

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true
}));

app.use(express.json({limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("HII SHRIDHAR");
})


app.use('/user',UserRouter);

app.use("/product",ProductRouter);

app.use("/order",OrderRouter);

app.use("/cart", CartRouter);

app.use("/admin",AdminRouter)

export default app;