import wrapAsync from "../../utils/wrapAsync.js";
import CartItem from "../db/models/cartItem.js";
import User from "../db/models/user.js";
import Address from "../db/models/address.js";
import Order from "../db/models/order.js";

export const getFavorites = wrapAsync(async (req, res, next) => {
  const user = await req.user.populate("favorites", [
    "-__v",
    "-updatedAt",
    "-createdAt",
    "-active",
  ]);
  res.status(200).json({ favorites: user.favorites });
});

export const addFavorite = wrapAsync(async (req, res, next) => {
  const { productId } = req.body;
  await req.user.addFavorite(productId);
  const user = await req.user.extractProfile();
  return res.status(200).json({ user });
});

export const removeFavorite = wrapAsync(async (req, res, next) => {
  const { productId } = req.body;
  await req.user.removeFavorite(productId);
  const user = await req.user.extractProfile();
  return res.status(200).json({ user });
});

export const getCart = wrapAsync(async (req, res, next) => {
  const user = await req.user.populate("cart", [
    "-__v",
    "-updatedAt",
    "-createdAt",
    "-active",
  ]);
  return res.status(200).json({ cart: user.cart });
});

export const addToCart = wrapAsync(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const [cartItem, created] = await CartItem.findOneOrCreate(
    productId,
    req.user,
    quantity
  );
  if (!created)
    return res
      .status(409)
      .json({ message: "The product is already in the cart" });
  const user = await req.user.extractProfile();
  return res.status(200).json({ user });
});

export const modifyCartItem = wrapAsync(async (req, res, next) => {
  const { cartItemId, quantity } = req.body;
  const cartItem = await CartItem.modifyCartItem(
    cartItemId,
    req.user,
    quantity
  );
  return res.status(200).json({ cartItem });
});

export const removeFromCart = wrapAsync(async (req, res, next) => {
  const { cartItemId } = req.body;
  const deleted = await CartItem.deleteCartItem(cartItemId, req.user);
  if (deleted) {
    const user = await req.user.extractProfile();
    return res.status(200).json({ user });
  } else {
    return res.status(400).json({ message: "Could not be deleted" });
  }
});

export const getUserProfile = wrapAsync(async (req, res, next) => {
  return res.status(200).json({ user: await req.user.extractProfile() });
});

export const modifyUserProfile = wrapAsync(async (req, res, next) => {
  const { fullName, birthday, phoneNumber } = req.body;
  const user = await User.findByIdAndUpdate(
    { _id: req.user._id },
    { fullName, birthday, phoneNumber },
    { new: true, runValidators: true }
  );
  return res.status(200).json({ user: await user.extractProfile() });
});

export const deleteUser = wrapAsync(async (req, res, next) => {
  if (req.user.role === "superadmin") {
    throw new Error("SuperAdmin can not be removed");
  } else {
    await User.deleteOne({ _id: req.user._id });
  }

  return res.status(200).json({ mesagge: "Removed complete" });
});

// ---------- ADDRESS ----------

export const createAddress = wrapAsync(async (req, res, next) => {
  const address = await Address.create({
    ...req.body,
    userId: req.user._id,
  });
  const user = await User.findOne({ _id: req.user._id });
  user.addresses.push(address._id);
  await user.save();
  return res.status(200).json({ address });
});

export const getUserAddresses = wrapAsync(async (req, res, next) => {
  const addresses = await Address.find({ userId: req.user._id });
  return res.status(200).json({ addresses });
});

export const modifyAddress = wrapAsync(async (req, res, next) => {
  const address = await Address.findOneAndUpdate(
    { _id: req.body.id, userId: req.user._id },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  return res.status(200).json({ address });
});

export const deleteAddress = wrapAsync(async (req, res, next) => {
  const address = await Address.deleteOne({
    _id: req.body.id,
    userId: req.user._id,
  });
  if (address.deletedCount) {
    const user = await User.findOne({ _id: req.user._id });
    const addresses = user.addresses.filter(
      (i) => i.toString() !== req.body.id
    );
    user.addresses = addresses;
    await user.save();
  }
  return res.status(200).json({ mesagge: "Deleted complete" });
});

// ---------- SALES ----------

export const getUserSales = wrapAsync(async (req, res, next) => {
  const sales = await Order.find({ userId: req.user._id }).populate(
    "orderItems"
  );
  return res.status(200).json({ sales });
});

export const getUserSaleDetails = wrapAsync(async (req, res, next) => {
  const sale = await Order.findById(req.params.saleId).populate("orderItems");
  return res.status(200).json({ sale });
});
