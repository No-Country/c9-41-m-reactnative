import { Router } from "express";

// CONTROLADORES AUTH
import { createUserLocal } from "../controllers/authControllers.js";

const authRouter = Router();

authRouter.route("/").post(createUserLocal);

export default authRouter;
