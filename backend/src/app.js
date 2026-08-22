import express from 'express'
import cors from 'cors'
import cookieParser from "cookie-parser";
const app=express();
import UserRouter from './routes/user.route.js'

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


app.use('/api',UserRouter);

export default app;