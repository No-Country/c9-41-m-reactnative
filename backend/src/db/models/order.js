import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    total: {
      type: Number,
    },
    shippingMethod: {
      type: String,
      lowercase: true,
      enum: ["delivery", "takeaway"],
      default: "delivery",
    },
    paymentMethod: {
      type: String,
    },
    paymentStatus: {
      type: String,
      lowercase: true,
      enum: ["approved", "pending", "cancel"],
      default: "pending",
    },
    shippingStatus: {
      type: String,
      lowercase: true,
      enum: ["pending", "sent", "finished"],
      default: "pending",
    },
    shippingAddress: {
      type: String,
      lowercase: true,
    },
    orderItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
