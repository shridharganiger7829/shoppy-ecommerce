import { Router } from "express";
import { registerUser ,
         LoginUser ,
         logoutUser,
         refreshAccessToken
} from "../controllers/user.controller.js";
import JWTVERIFY from "../middlewares/auth.middleware.js"

const router = Router();

router.post("/register",registerUser);

router.post("/login",LoginUser);

router.post("/logout",JWTVERIFY,logoutUser);

router.post("/refresh-access",refreshAccessToken);

export default router;