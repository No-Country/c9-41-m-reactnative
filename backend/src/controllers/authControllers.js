import wrapAsync from "../../utils/wrapAsync.js";
import User from "../db/models/user.js";
import jwt from "jsonwebtoken";
import "../auth/auth.js";
import { emailRegistro } from "../../utils/email.js";
// import verifyEmailFile from "../views/verifyEmail";

const { SECRETO_JWT, PATH_BACK } = process.env;

export const createUserLocal = wrapAsync(async (req, res, next) => {
  const { email, password, name, lastname, birthday, phoneNumber } = req.body;

  // Consultamos si el mail esta en uso
  const exist = await User.findOne({ email });

  // Si no existe creamos el usuario => no estamos guardandolo en la DB todavia
  if (!exist) {
    const newUser = await new User({
      email,
      username: email,
      name,
      lastname,
      birthday,
      phoneNumber,
    });

    // Registramos al usuario con la estrategia de passport y mongoose => lo guardamos en la DB al mismo tiempo que creamos la contraseña hasheada
    const registeredUser = await User.register(newUser, password);

    // Obtenemos el perfil del usuario
    const user = await registeredUser.extractProfile();

    // Serializamos al usuario con session cookie
    await req.login(registeredUser, (err) => {
      if (err) return next(err);
    });

    // ------ Enviar mail con Token para verificar el email del usuario ------
    const token = jwt.sign({ user: user.username }, SECRETO_JWT, {
      expiresIn: "1h",
    });
    const link = `${PATH_BACK}/auth/verifyemail?token=${token}`;

    await emailRegistro(user.username, link);

    return res.status(200).send({ message: "User created", user });
  } else {
    // Si ya existe devolvemos error
    return res.status(400).send({ message: "Email in use" });
  }
});

export const verifyUserEmail = wrapAsync(async (req, res, next) => {
  await User.findOneAndUpdate(
    { email: req.user },
    { verified: true },
    { new: true }
  );
  return res.sendFile("verifyEmail.html", { root: req.dirnameViews });
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

export const finishGoogleLogin = wrapAsync(async (req, res, next) => {
  req.login(req.user, (err) => {
    if (err) {
      return next(err);
    }
  });
  return res.sendFile("logeoGoogle.html", { root: req.dirnameViews });
});
