import express from "express";
import session from "express-session";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import MongoStore from "connect-mongo";
// import morgan from "morgan"; // => Lo usamos?

// PASSPORT
import passport from "passport";
import LocalStrategy from "passport-local";
import "./auth/auth.js";

// MODELOS
import User from "./db/models/user.js";

// IMPORTACION DE RUTAS
import authRoutes from "./routes/authRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productsRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRouter.js";
import adminRoutes from "./routes/adminRoutes.js";
import shopRoutes from "./routes/shopRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";

const { DB_URI, PATH_FRONT, SESSION_SECRET } = process.env;

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: [
      `${process.env.PATH_FRONT}`,
      `${process.env.PATH_FRONT_ADMIN}`,
      `http://localhost:3000`,
    ], //URL DEL FRONT!!
    credentials: true,
    methods: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
  })
);

app.use((req, res, next) => {
  req.dirnameViews = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "/views"
  );
  next();
});

// SESSION
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: DB_URI,
    }),
    secret: `${SESSION_SECRET}`,
    resave: false,
    saveUninitialized: true,
    name: "sessionNoCountry",
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
      sameSite: "lax",
      // secure: true,
    },
  })
);

// PASSPORT
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Rutas
app.use((req, res, next) => {
  console.log("req.user", req.user);
  console.log("req.session.user", req.session);
  console.log("req.cookies", req.cookies);
  console.log("passport.session", passport.session());
  next();
});
app.use("/auth", authRoutes);
app.use("/categories", categoryRouter);
app.use("/products", productsRouter);
app.use("/user", userRouter);
app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/payment", paymentRouter);

// Manejo errores
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.log("Manejo errores: ", message);
  res.status(status).send(message);
});

export default app;
