import { Router } from "express";
import { isLogIn } from "../auth/authMiddlewares.js";
import { convertirCarritoEnOrden } from "../controllers/paymentControlles.js";
import PaymentController from "../services/paymentController.js";
import PaymentService from "../services/paymentService.js";

const PaymentInstance = new PaymentController(new PaymentService());

const paymentRouter = Router();

paymentRouter.post("/mercadopago/respuesta", async (req, res) => {
  console.log("req.body: ", req.body);
  console.log("req.body.action: ", req.body.action);
  async function cambiarEstadoPagoOrden(body) {
    const infoPago = await axios.get(
      "https://api.mercadopago.com/v1/payments/" + body.data.id,
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN_MP}`,
        },
      }
    );
    let estado = "";
    if (infoPago.data.status === "approved") {
      estado = "paid";
    } else if (infoPago.data.status === "pending") {
      estado = "pending";
    } else {
      estado = "cancel";
    }
    if (estado === "paid" || estado === "cancel") {
      if (estado === "cancel") {
        const orden = await Order.findOne({
          where: { id: parseInt(infoPago.data.external_reference) },
          include: {
            model: OrderItem,
            include: [{ model: Products }, { model: Stock }],
          },
        });
        if (!orden) {
          console.log("error con numero de orden");
          return res.status(400).send("Problema con el numero de orden");
        }
        if (orden.paymentStatus === "pending") {
          for (const itemOrden of orden.OrderItems) {
            await Stock.increment("quantity", {
              by: parseInt(itemOrden.quantity),
              where: { id: itemOrden.Stock.id },
            });
          }
        }
      }
      await Order.update(
        { paymentStatus: estado, paymentId: body.data.id },
        {
          where: {
            id: parseInt(infoPago.data.external_reference),
          },
        }
      );
      if (estado === "paid") {
        respuestaPago(infoPago.data.external_reference, "paid");
      } else {
        respuestaPago(infoPago.data.external_reference, "cancel");
      }
    }
  }

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
