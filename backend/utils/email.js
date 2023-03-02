import nodemailer from "nodemailer";
import Order from "../src/db/models/order.js";

const { NODEMAILER_CONTRASENA, NODEMAILER_USUARIO } = process.env;

export const emailRegistro = async (userMail, link) => {
  try {
    let contentHTML = `
        <h3>"Bienvenido a Restaurante No-Country"</h3>
        <p>Seguí el siguiente link para completar el proceso de registro</p>
        <a href="${link}">${link}</a>
    `;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: `${NODEMAILER_USUARIO}`,
        pass: `${NODEMAILER_CONTRASENA}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const info = await transporter.sendMail({
      from: `"Verifica tu cuenta!" ${NODEMAILER_USUARIO}`,
      to: `${userMail}`,
      subject: "Completa la verificación de tu cuenta!",
      html: contentHTML,
    });
  } catch (e) {
    console.log("Error envio mail", e);
  }
};

export const respuestaPago = async (idOrden, status) => {
  try {
    const orden = await Order.findOne({ id: idOrden }).populate([
      "orderItems",
      "userId",
    ]);

    let contentHTML = `
		<h3>${
      status === "approved"
        ? "Su pago ha sido realizado con éxito"
        : "Ha habido un problema con el pago de su pedido"
    }</h3>
		<p>A continuación le mostramos los detalles:</p>
		<p>Nº de pedido: ${orden._id} - Fecha: ${orden.createdAt
      .toJSON()
      .slice(0, 10)}</p>
		<p>Importe total: $ ${orden.total}</p>
    <p>Dirección de envío: ${orden.shippingAddress}</p>

		<h3>Su compra:</h3>
		
    <table> 
      <thead>
        <tr style="text-align: center">
          <th>#</th>
          <th>Item</th>
          <th>Cantidad</th>
          <th>Precio unit</th>
       </tr>
      </thead>
      <tbody>
        ${orden.orderItems.map((i, idx) => {
          return `<tr style="text-align: center">
              <td>${idx + 1}</td>
              <td>${i.name}</td>
              <td>${i.quantity}</td>
              <td>$ ${i.price}</td>
            </tr>`;
        })}
      </tbody>
    </table>

		<p>Gracias por su compra</p>
	`;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: `${NODEMAILER_USUARIO}`,
        pass: `${NODEMAILER_CONTRASENA}`,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const info = await transporter.sendMail({
      from: `"MM eCommerce!" ${NODEMAILER_USUARIO}`,
      to: `${orden.userId.email}`,
      subject: `Detalle compra # ${orden._id}`,
      html: contentHTML,
    });

    console.log("Message sent", info.messageId);
  } catch (e) {
    console.log(e);
  }
};
