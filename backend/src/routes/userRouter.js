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
  deleteUser,
  createAddress,
  getUserAddresses,
  modifyAddress,
  deleteAddress,
  getUserSales,
  getUserSaleDetails,
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
  .put(isLogIn, modifyUserProfile)
  .delete(isLogIn, deleteUser);

userRouter
  .route("/address")
  .get(isLogIn, getUserAddresses)
  .post(isLogIn, createAddress)
  .put(isLogIn, modifyAddress)
  .delete(isLogIn, deleteAddress);

userRouter.route("/sales").get(isLogIn, getUserSales);

userRouter.route("/sales/:saleId").get(isLogIn, getUserSaleDetails);

export default userRouter;
