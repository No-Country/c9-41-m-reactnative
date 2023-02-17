import wrapAsync from "../../utils/wrapAsync.js";
import Product from "../db/models/product.js";

export const findProducts = wrapAsync(async (req, res, next) => {
  const products = await Product.find(
    {
      name: { $regex: `${req.query.find}`, $options: "i" },
      active: true,
    },
    ["-active", "-createdAt", "-updatedAt", "-__v", "sales"]
  );
  res.status(200).json({ products });
});

export const getBestSellers = wrapAsync(async (req, res, next) => {
  const bestSellers = await Product.find(
    {
      sales: {
        $gt: 0,
      },
      active: true,
    },
    ["-active", "-createdAt", "-updatedAt", "-__v", "-sales"]
  )
    .limit(15)
    .sort({ sales: 1 });
  return res.status(200).json({ bestSellers });
});

export const getFilterCategory = wrapAsync(async (req, res, next) => {
  const { filter } = req.query;
  let categories = [];
  if (filter.includes(",")) {
    categories = filter.split(",");
  } else {
    categories.push(req.query.filter);
  }
  let products = [];
  if (categories.length > 1) {
    products = await Product.find({ categories: categories });
  } else {  
    products = await Product.find({ categories: { $in: categories } });
  }
  return res.status(200).json({ products });
});
