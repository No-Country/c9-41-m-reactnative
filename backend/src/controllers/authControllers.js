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
      // image,
      birthday,
      phoneNumber,
    });

    // Registramos al usuario con la estrategia de passport y mongoose
    const user = await User.register(usuario, password);

    // Serializamos al usuario con session cookie
    req.login(user, (err) => {
      if (err) return next(err);
    });

    // ------ Enviar mail con Token para verificar el email del usuario ------

    return res.status(200).send({ message: "Created", user });
  } else {
    // Si ya existe devolvemos error
    return res.status(400).send({ message: "Email in use" });
  }
});

export const signInLocal = wrapAsync(async (req, res, next) => {
  let user = await req.user.extractProfile();
  return res.status(200).send({ user });
});

export const logOut = wrapAsync(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
  });
  return res.status(200).json({
    message: "Logout successfully",
  });
});
