import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    min: [0, "Quantity can't be negative"],
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

cartItemSchema.statics.findOneOrCreate = async function (
  productId,
  user,
  quantity
) {
  let cartItem = await this.findOne({ productId, userId: user._id });
  let created = false;
  if (!cartItem) {
    created = true;
    cartItem = await this.create({
      userId: user._id,
      productId,
      quantity,
    });
    await user.cart.push(cartItem._id);
    await user.save();
  }
  return [cartItem, created];
};

cartItemSchema.statics.deleteCartItem = async function (cartItemId, user) {
  const cartItemDeleted = await this.deleteOne({
    _id: cartItemId,
    userId: user._id,
  });
  if (cartItemDeleted.deletedCount) {
    const cart = user.cart.filter(
      (i) => i.toString() !== cartItemId.toString()
    );
    user.cart = cart;
    await user.save();
    return true;
  } else {
    return false;
  }
};

cartItemSchema.statics.modifyCartItem = async function (
  cartItemId,
  user,
  quantity
) {
  const cartItem = await this.findOneAndUpdate(
    { _id: cartItemId, userId: user._id },
    { quantity },
    { new: true, runValidators: true }
  );
  return cartItem;
};

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
