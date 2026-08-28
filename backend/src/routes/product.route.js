import { Router } from "express";
import { getProducts , getProductById , createProduct, UpdateProduct, deleteProduct} from "../controllers/product.controller.js";
import JWTVERIFY from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import admin from "../middlewares/admin.middleware.js";

const router=Router();

router.route("/").get(getProducts).post(JWTVERIFY , admin , upload.single("image")  , createProduct);

router.route("/:id").get(getProductById).patch(JWTVERIFY , admin , upload.single("image"), UpdateProduct).delete(JWTVERIFY,admin,deleteProduct);

export default router;