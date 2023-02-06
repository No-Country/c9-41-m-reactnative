import { Router } from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
  getCart,
  addToCart,
  modifyCartItem,
  removeFromCart,
} from "../controllers/userControllers.js";

const userRouter = Router();

userRouter
  .route("/favorites")
  .get(getFavorites)
  .post(addFavorite)
  .delete(removeFavorite);

userRouter
  .route("/cart")
  .get(getCart)
  .post(addToCart)
  .put(modifyCartItem)
  .delete(removeFromCart);

export default userRouter;
