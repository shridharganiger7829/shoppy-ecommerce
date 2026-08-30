import Router from "express"
import JWTVERIFY from "../middlewares/auth.middleware.js";
import admin from "../middlewares/admin.middleware.js";
import { getDashboardstats } from "../controllers/admin.controller.js";

const router=Router();

router.route("/dashboard").get(JWTVERIFY,admin,getDashboardstats)

export default router;