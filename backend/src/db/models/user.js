import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email requerido",
      // match: [
      //   /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      //   "Email invalido",
      // ],
    },
    // password: {
    //   type: String,
    //   required: true,
    // },
    // username: {
    //   type: String,
    //   lowercase: true,
    //   trim: true,
    //   // required: true,
    // },
    name: {
      type: String,
      lowercase: true,
      trim: true,
      // required: true,
    },
    lastname: {
      type: String,
      lowercase: true,
      trim: true,
      // required: true,
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
      // required: true,
      default: true,
    },
    role: {
      type: String,
      lowercase: true,
      enum: ["user", "admin", "superadmin"],
      default: "user",
    },
    // verificated: {
    //   type: Boolean,
    //   // required: true,
    //   default: false,
    // },
    createdIn: {
      type: String,
      lowercase: true,
      enum: ["local", "google"],
      default: "local",
    },
    // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
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
    image: this.image,
    // virificated: this.virificated,
    // favorites: this.faforites
  };
  return userProfile;
};

// userSchema.pre("extraerPerfil", async function (data) {
//   await this.populate("favorites");
// });

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

export default User;
