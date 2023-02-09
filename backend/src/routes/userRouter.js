import { Router } from "express";
import { isLogIn } from "../auth/authMiddlewares.js";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  getCart,
  addToCart,
  modifyCartItem,
  removeFromCart,
  getUserProfile,
  modifyUserProfile,
} from "../controllers/userControllers.js";

const userRouter = Router();

userRouter
  .route("/favorites")
  .get(isLogIn, getFavorites)
  .post(isLogIn, addFavorite)
  .delete(isLogIn, removeFavorite);

userRouter
  .route("/cart")
  .get(isLogIn, getCart)
  .post(isLogIn, addToCart)
  .put(isLogIn, modifyCartItem)
  .delete(isLogIn, removeFromCart);

userRouter
  .route("/profile")
  .get(isLogIn, getUserProfile)
  .put(isLogIn, modifyUserProfile);

export default userRouter;
