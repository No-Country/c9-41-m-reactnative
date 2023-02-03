import { Router } from "express";
import passport from "passport";

// CONTROLADORES AUTH
import {
  createUserLocal,
  signInLocal,
  logOut,
} from "../controllers/authControllers.js";

const authRouter = Router();

// Registro local
authRouter.post("/login", createUserLocal);

// Inicio sesión local
authRouter.post(
  "/signin",
  passport.authenticate("local", { session: true }),
  signInLocal
);

// Cerrar sesión
authRouter.post("/logout", logOut);

export default authRouter;
