import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    min: [1, "Quantity can't be negative"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  //   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const OrderItem = mongoose.model("OrderItem", orderItemSchema);

export default OrderItem;
