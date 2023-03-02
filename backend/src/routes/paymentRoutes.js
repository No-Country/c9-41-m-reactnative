import { Router } from "express";
import { isLogIn } from "../auth/authMiddlewares.js";
import {
  cambiarEstadoPagoOrden,
  convertirCarritoEnOrden,
} from "../controllers/paymentControlles.js";
import PaymentController from "../services/paymentController.js";
import PaymentService from "../services/paymentService.js";

const PaymentInstance = new PaymentController(new PaymentService());

const paymentRouter = Router();

paymentRouter.post("/mercadopago/respuesta", async (req, res) => {
  console.log("req.body: ", req.body);
  console.log("req.body.action: ", req.body.action);

  if (req.body.action === "payment.created") {
    try {
      await cambiarEstadoPagoOrden(req.body);
      res.status(200).send("ok");
    } catch (error) {
      console.log("Error en payment.created", error);
      res.status(500).send("hubo un problema");
    }
  } else {
    res.status(200).send("ok");
  }
});

paymentRouter
  .route("/mercadopago/:userId")
  .post(isLogIn, convertirCarritoEnOrden, (req, res, next) => {
    PaymentInstance.getPaymentLink(req.body, res, next);
  });

export default paymentRouter;
