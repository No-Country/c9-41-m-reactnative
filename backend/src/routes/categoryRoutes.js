import { Router } from "express";
import { verificateAdminRole } from "../auth/authMiddlewares.js";
import { upload } from "../cloudinary/cloudinary.js";

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
  .post(verificateAdminRole, upload.array("image", 1), createCategory)
  .put(verificateAdminRole, upload.array("image", 1), modifyCategory)
  .delete(verificateAdminRole, deleteCategory);

export default categoryRouter;
