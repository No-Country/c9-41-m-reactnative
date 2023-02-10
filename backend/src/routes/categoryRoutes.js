import { Router } from "express";
import { verificateAdminRole } from "../auth/authMiddlewares.js";

import {
  getCategories,
  createCategory,
  modifyCategory,
  deleteCategory,
} from "../controllers/categoryControllers.js";

const categoryRouter = Router();

// categoryRouter.get("/", getCategories);
categoryRouter
  .route("/")
  .get(getCategories)
  .post(verificateAdminRole, createCategory)
  .put(verificateAdminRole, modifyCategory)
  .delete(verificateAdminRole, deleteCategory);

export default categoryRouter;
