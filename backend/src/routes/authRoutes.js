import { Router } from "express";
import passport from "passport";
import "../auth/auth.js";
import {
  createUserLocal,
  verifyUserEmail,
  signInLocal,
  logOut,
  finishGoogleLogin,
} from "../controllers/authControllers.js";

const { PATH_FRONT } = process.env;

const authRouter = Router();

// Registro local
authRouter.post("/login", createUserLocal);

authRouter.get(
  "/verifyemail",
  passport.authenticate("jwt", { session: false }),
  verifyUserEmail
);

// Inicio sesión local
authRouter.post(
  "/signin",
  passport.authenticate("local", { session: true }),
  signInLocal
);

// Cerrar sesión
authRouter.post("/logout", logOut);

// Logueo google
authRouter.get(
  "/google",
  passport.authenticate("google", {
    session: true,
    scope: ["profile", "email", "openid"],
    prompt: "select_account",
  })
);

authRouter.get(
  "/google/redirect",
  passport.authenticate("google", {
    session: true,
    failureRedirect: "/auth/google/fail",
  }),
  finishGoogleLogin
);

authRouter.get("/google/fail", (req, res) => {
  res.redirect(`${PATH_FRONT}/auth?fallo=googleLocal`);
});

export default authRouter;
