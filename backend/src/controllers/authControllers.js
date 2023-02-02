import wrapAsync from "../../utils/wrapAsync.js";
import User from "../db/models/user.js";

export const createUserLocal = wrapAsync(async (req, res, next) => {
  const { email, password, name, lastname, image, birthday, phoneNumber } =
    req.body;

  // Consultamos si el mail esta en uso
  const yaExiste = await User.findOne({ email });

  // Si no existe creamos el usuario
  if (!yaExiste) {
    const usuario = await new User({
      email,
      username: email,
      name,
      lastname,
      image,
      birthday,
      phoneNumber,
    });
    // Registramos al usuario con la estrategia de passport y mongoose
    const usuarioRegistrado = await User.register(usuario, password);
    // Logeamos al usuario con session
    req.login(usuarioRegistrado, (err) => {
      if (err) return next(err);
    });

    // ------ Enviar mail con Token para verificar el email del usuario ------

    //Envio respuesta
    if (req.session.viewCount) {
      req.session.viewCount++;
    } else {
      req.session.viewCount = 1;
    }
    return res.status(200).send({ mensaje: "created" });
  } else {
    // Si ya existe devolvemos error
    res.status(400).send({ mensaje: "Email in use" });
  }
});
