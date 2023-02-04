import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

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
    name: {
      type: String,
      trim: true,
    },
    lastname: {
      type: String,
      trim: true,
    },
    // image: {
    //   type: String,
    //   lowercase: true,
    // },
    birthday: {
      type: Date,
    },
    phoneNumber: {
      type: Number,
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
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.extractProfile = async function () {
  const userProfile = {
    id: this._id,
    email: this.email,
    name: this.name,
    lastname: this.lastname,
    phoneNumber: this.phoneNumber,
    birthday: this.birthday,
    role: this.role,
    verified: this.verified,
    favorites: this.favorites,
  };
  return userProfile;
};

userSchema.pre("extractProfile", async function (data) {
  await this.populate("favorites");
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
