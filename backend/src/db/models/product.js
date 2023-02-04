import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      maxlength: [30, "Name can be no longer than thirty characters"],
      required: "A name is required",
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price can't be negative"],
    },
    description: {
      type: String,
      trim: true,
      required: "A description is required",
      maxlength: [
        150,
        "Description can be no longer than one hundred and fifty characters",
      ],
    },
    stock: {
      type: Number,
      min: [0, "Stock can't be negative"],
      default: 0,
    },
    onSale: { type: Boolean, default: false },
    discount: {
      type: Number,
      default: 0,
      min: [0, "Discount can't be negative"],
    },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    // Para determinar si esta eliminado (Soft deleted)
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.methods.addCategory = function (newCategory) {
  if (!this.categories.includes(newCategory)) {
    this.categories.push(newCategory);
    return this.save();
  } else {
    throw new Error("Category already added");
  }
};

productSchema.methods.removeCategory = function (category) {
  this.categories = this.categories.filter((i) => i !== category);
  return this.save();
};

const Product = mongoose.model("Product", productSchema);

export default Product;
