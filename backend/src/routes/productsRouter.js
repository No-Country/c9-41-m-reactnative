import { Router } from "express";
import { verificateAdminRole } from "../auth/authMiddlewares.js";
import {
  getProducts,
  createProduct,
  modifyProduct,
  deleteProduct,
} from "../controllers/productsControllers.js";

const productsRouter = Router();

productsRouter
  .route("/")
  .get(getProducts)
  .post(verificateAdminRole, createProduct)
  .put(verificateAdminRole, modifyProduct)
  .delete(verificateAdminRole, deleteProduct);

export default productsRouter;
