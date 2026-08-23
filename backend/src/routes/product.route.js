import { Router } from "express";
import { getProducts , getProductById , createProduct} from "../controllers/product.controller.js";
import JWTVERIFY from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import admin from "../middlewares/admin.moddleware.js";

const router=Router();

router.route("/").get(getProducts).post(JWTVERIFY , admin , upload.single("image")  , createProduct);

router.route("/:id").get(getProductById)
export default router;