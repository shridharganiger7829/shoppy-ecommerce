import { Router } from "express";
import { registerUser ,
         verifyOtp,
         LoginUser ,
         logoutUser,
         refreshAccessToken,
         getCurrentUser,
         Getallusers
} from "../controllers/user.controller.js";
import JWTVERIFY from "../middlewares/auth.middleware.js"
import admin from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/register",registerUser);

router.post("/verify-otp",verifyOtp);

router.post("/login",LoginUser);

router.post("/logout",JWTVERIFY,logoutUser);

router.route("/me").get(JWTVERIFY, getCurrentUser)

router.get("/getusers",JWTVERIFY,admin,Getallusers);

router.post("/refresh-access",refreshAccessToken);

export default router;