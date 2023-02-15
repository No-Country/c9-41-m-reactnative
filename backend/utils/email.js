import nodemailer from "nodemailer";

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
