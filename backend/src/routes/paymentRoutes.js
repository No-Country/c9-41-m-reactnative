import { Router } from "express";
import { isLogIn } from "../auth/authMiddlewares.js";
import { convertirCarritoEnOrden } from "../controllers/paymentControlles.js";

const paymentRouter = Router();

paymentRouter
  .route("/mercadopago/:userId")
  .post(isLogIn, convertirCarritoEnOrden);

export default paymentRouter;
