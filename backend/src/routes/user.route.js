import { Router } from "express";
import { registerUser ,
         verifyOtp,
         LoginUser ,
         logoutUser,
         refreshAccessToken,
         Getallusers
} from "../controllers/user.controller.js";
import JWTVERIFY from "../middlewares/auth.middleware.js"
import admin from "../middlewares/admin.moddleware.js";

const router = Router();

router.post("/register",registerUser);

router.post("/verify-otp",verifyOtp);

router.post("/login",LoginUser);

router.post("/logout",JWTVERIFY,logoutUser);

router.get("/getusers",JWTVERIFY,admin,Getallusers);

router.post("/refresh-access",refreshAccessToken);

export default router;