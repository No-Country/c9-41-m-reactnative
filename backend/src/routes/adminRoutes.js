import { Router } from "express";
import { verificateAdminRole } from "../auth/authMiddlewares.js";

import { getUsers, getUserDetails } from "../controllers/adminControllers.js";

const adminRoutes = Router();

adminRoutes.route("/users").get(verificateAdminRole, getUsers);

adminRoutes.route("/users/:userid").get(verificateAdminRole, getUserDetails);

export default adminRoutes;
