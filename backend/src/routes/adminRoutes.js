import { Router } from "express";
import {
  verificateAdminRole,
  verificateSuperAdminRole,
} from "../auth/authMiddlewares.js";

import {
  getUsers,
  getUserDetails,
  changeUserRole,
} from "../controllers/adminControllers.js";

const adminRoutes = Router();

adminRoutes.route("/users").get(verificateAdminRole, getUsers);

adminRoutes
  .route("/user/:userid")
  .get(verificateAdminRole, getUserDetails)
  .put(verificateSuperAdminRole, changeUserRole);

export default adminRoutes;
