import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: [20, "Name can be no longer than twenty characters"],
      trim: true,
      lowercase: true,
      unique: true,
      required: "A name is required",
    },
    image: {
      url: { type: String },
      name: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
