import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import Product from "./product.js";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "A email is required",
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email"],
    },
    // password: => generada por passport-local-mongoose
    // username: => lo usa passport-local-mongoose para generar contraseña
    fullName: {
      type: String,
      trim: true,
      maxlength: [25, "The name can not have more than 25 characters"],
    },
    birthday: {
      type: Date,
    },
    phoneNumber: {
      type: Number,
      max: [
        999999999999,
        "The phone number can not have more than 12 characters",
      ],
    },
    active: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      lowercase: true,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    verified: {
      type: Boolean,
      default: false,
    },
    createdIn: {
      type: String,
      lowercase: true,
      enum: ["local", "google"],
      default: "local",
    },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.extractProfile = async function () {
  const userProfile = {
    id: this._id,
    username: this.username,
    fullName: this.fullName,
    phoneNumber: this.phoneNumber,
    birthday: this.birthday,
    role: this.role,
    verified: this.verified,
    favorites: this.favorites,
    cart: this.cart,
    addresses: this.addresses,
    orders: this.orders,
  };
  return userProfile;
};

userSchema.methods.addFavorite = async function (productId) {
  const product = await Product.findOne({ _id: productId });
  if (
    !this.favorites.find((i) => {
      return i.toString() === product._id.toString();
    })
  ) {
    if (product && product.active) {
      this.favorites.push(product._id);
    }
  }
  return this.save();
};

userSchema.methods.removeFavorite = async function (productId) {
  const product = await Product.findOne({ _id: productId });
  if (product && product.active) {
    const favorites = this.favorites.filter((i) => {
      return i.toString() !== product._id.toString();
    });
    this.favorites = favorites;
  }
  return this.save();
};

userSchema.statics.getCart = async function (userId) {
  const user = await this.findOne({ _id: userId }).populate("cart");
  return user.cart;
};

// userSchema.post("extractProfile", async function (data) {
//   await this.populate("favorites", [
//     "-active",
//     "-createdAt",
//     "-updatedAt",
//     "-__v",
//   ]);
// });

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
