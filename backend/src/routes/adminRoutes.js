import { Router } from "express";
import {
  verificateAdminRole,
  verificateSuperAdminRole,
} from "../auth/authMiddlewares.js";

import {
  getUsers,
  getUserDetails,
  changeUserRole,
  retrieveUser,
  banUser,
  getSales,
  getSaleDetails,
} from "../controllers/adminControllers.js";

const adminRoutes = Router();

adminRoutes.route("/users").get(verificateAdminRole, getUsers);

adminRoutes
  .route("/user/:userid")
  .get(verificateAdminRole, getUserDetails)
  .put(verificateSuperAdminRole, changeUserRole)
  .patch(verificateAdminRole, retrieveUser)
  .delete(verificateAdminRole, banUser);

adminRoutes.route("/sales").get(verificateAdminRole, getSales);
adminRoutes.route("/sales/:saleId").get(verificateAdminRole, getSaleDetails);

export default adminRoutes;
