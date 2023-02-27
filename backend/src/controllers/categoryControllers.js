import wrapAsync from "../../utils/wrapAsync.js";
import Category from "../db/models/category.js";

export const getCategories = wrapAsync(async (req, res, next) => {
  let categories = [];
  req.user?.role === "admin" || req.user?.role === "superadmin"
    ? (categories = await Category.find())
    : (categories = await Category.find({}, [
        "-createdAt",
        "-updatedAt",
        "-__v",
      ]));

  return res.status(200).json({ categories });
});

export const createCategory = wrapAsync(async (req, res, next) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  return res.status(200).json({ category });
});

export const modifyCategory = wrapAsync(async (req, res, next) => {
  const { id, name } = req.body;
  const category = await Category.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );
  return res.status(200).json({ category });
});

export const deleteCategory = wrapAsync(async (req, res, next) => {
  const { id } = req.body;
  await Category.deleteOne({ _id: id });
  return res.status(200).json({ message: "Removed successfully" });
});
