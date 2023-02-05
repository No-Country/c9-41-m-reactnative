import wrapAsync from "../../utils/wrapAsync.js";
import Product from "../db/models/product.js";

export const getProducts = wrapAsync(async (req, res, next) => {
  let products = [];
  req.user?.role === "admin" || req.user?.role === "superadmin"
    ? (products = await Product.find())
    : (products = await Product.find({ active: true }, [
        "-active",
        "-createdAt",
        "-updatedAt",
        "-__v",
      ]));

  return res.status(200).json({ products });
});

export const createProduct = wrapAsync(async (req, res, next) => {
  const product = await Product.create(req.body);
  return res.status(200).json({ product });
});

export const modifyProduct = wrapAsync(async (req, res, next) => {
  const { id } = req.body;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  return res.status(200).json({ product });
});

export const deleteProduct = wrapAsync(async (req, res, next) => {
  const { id } = req.body;
  await Product.findOneAndUpdate({ _id: id }, { active: false });
  return res.status(200).json({ message: "Removed successfully" });
});

export const reActiveProduct = wrapAsync(async (req, res, next) => {
  const { id } = req.body;
  await Product.findOneAndUpdate({ _id: id }, { active: true });
  return res.status(200).json({ message: "Removed successfully" });
});
