import { Router } from "express";
import { verificateAdminRole } from "../auth/authMiddlewares.js";
import { upload } from "../cloudinary/cloudinary.js";
import {
  getProducts,
  createProduct,
  modifyProduct,
  recoverProduct,
  deleteProduct,
  // findProducts, 
} from "../controllers/productsControllers.js";

const productsRouter = Router();

productsRouter
  .route("/")
  .get(getProducts)
  .post(verificateAdminRole, upload.array("images", 5), createProduct)
  .put(verificateAdminRole, upload.array("images", 5), modifyProduct)
  .patch(verificateAdminRole, recoverProduct)
  .delete(verificateAdminRole, deleteProduct);

// productsRouter.route("/search").get(findProducts);

export default productsRouter;
