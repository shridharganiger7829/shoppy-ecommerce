import Router from "express"
import JWTVERIFY from "../middlewares/auth.middleware.js";
import { createOrder ,getorders , getMyOrders , updateOrderStatus , cancelMyOrder} from "../controllers/order.controller.js";
import admin from "../middlewares/admin.middleware.js";

const router=Router();

router.route("/").post(JWTVERIFY,createOrder).get(JWTVERIFY,getMyOrders);

router.route("/cancel-Order/:id").delete(JWTVERIFY,cancelMyOrder);

router.route("/get-orders").get(JWTVERIFY,admin,getorders)

router.route("/update-status/:id").patch(JWTVERIFY,admin,updateOrderStatus);

export default router;