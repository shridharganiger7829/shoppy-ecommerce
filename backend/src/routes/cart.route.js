import Router from "express"
import JWTVERIFY from "../middlewares/auth.middleware.js";
import { addToCart , updateCart , deleteCart, clearCart, getCart} from "../controllers/cart.controller.js";

const  router=Router();

router.route("/add-cart").post(JWTVERIFY,addToCart);

router.route("/get-cart").get(JWTVERIFY,getCart);

router.route("/update-cart/:productId").patch(JWTVERIFY,updateCart);

router.route("/delete-cart/:productId").delete(JWTVERIFY,deleteCart);

router.route("/clear-cart").delete(JWTVERIFY,clearCart)

export default router;