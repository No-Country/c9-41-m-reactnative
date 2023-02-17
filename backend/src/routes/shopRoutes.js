import { Router } from "express";
// import { isLogIn } from "../auth/authMiddlewares.js";
import {
  findProducts,
  getBestSellers,
  getFilterCategory,
} from "../controllers/shopControllers.js";

const userRouter = Router();

userRouter.route("/search").get(findProducts);

userRouter.route("/bestsellers").get(getBestSellers);

userRouter.route("/filtercategory").get(getFilterCategory);

export default userRouter;
