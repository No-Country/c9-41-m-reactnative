import wrapAsync from "../../utils/wrapAsync.js";
import cloudinary from "../cloudinary/cloudinary.js";
import Product from "../db/models/product.js";

export const getProducts = wrapAsync(async (req, res, next) => {
  let products = [];
  req.user?.role === "admin" || req.user?.role === "superadmin"
    ? (products = await Product.find({ active: true }))
    : (products = await Product.find({ active: true, stock: { $gt: 0 } }, [
        "-active",
        "-createdAt",
        "-updatedAt",
        "-__v",
      ]));

  return res.status(200).json({ products });
});

export const createProduct = wrapAsync(async (req, res, next) => {
  let categories = [];
  if (req.body.categories?.includes(",")) {
    categories = req.body.categories.split(",");
    req.body.categories = categories;
  }
  const product = await Product.create(req.body);
  if (req.files?.length) {
    for (const image of req.files) {
      product.images.push({
        url: image.path,
        name: image.filename,
      });
    }
    product.save();
  }
  return res.status(200).json({ product });
});

export const modifyProduct = wrapAsync(async (req, res, next) => {
  console.log("req.body", req.body);
  let categories = [];
  if (req.body.categories?.includes(",")) {
    categories = req.body.categories.split(",");
    req.body.categories = categories;
  }
  const { id } = req.body;
  const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  const imagesToDelete = req.body.imagesToDelete?.split(",");

  if (imagesToDelete?.length) {
    for (const image of imagesToDelete) {
      await cloudinary.uploader.destroy(`${image}`);
      await product.updateOne({
        $pull: { images: { name: { $in: image } } },
      });
    }
  }

  if (req.files?.length) {
    for (const image of req.files) {
      product.images.push({
        url: image.path,
        name: image.filename,
      });
    }
  }

  product.save();

  return res.status(200).json({ product });
});

export const recoverProduct = wrapAsync(async (req, res, next) => {
  const { id } = req.body;
  const product = await Product.findOneAndUpdate(
    { _id: id },
    { active: true },
    { new: true, runValidators: true }
  );
  return res.status(200).json({ message: "Recovery successfully", product });
});

export const deleteProduct = wrapAsync(async (req, res, next) => {
  const { id } = req.body;
  await Product.findOneAndUpdate({ _id: id }, { active: false });
  return res.status(200).json({ message: "Removed successfully" });
});

export const getDeletedProducts = wrapAsync(async (req, res, next) => {
  const products = await Product.find({
    active: false,
  });
  res.status(200).json({ products });
});
