import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    trim: true,
    lowercase: true,
    required: "A street is required",
  },
  number: {
    type: Number,
    required: "A number is required",
  },
  city: {
    type: String,
    trim: true,
    lowercase: true,
    required: "A city is required",
  },
  province: {
    type: String,
    lowercase: true,
    trim: true,
    // enum: [
    //   "Buenos Aires",
    //   "Ciudad Autónoma de Buenos Aires",
    //   "Catamarca",
    //   "Chaco",
    //   "Chubut",
    //   "Córdoba",
    //   "Corrientes",
    //   "Entre Ríos",
    //   "Formosa",
    //   "Jujuy",
    //   "La Pampa",
    //   "La Rioja",
    //   "Mendoza",
    //   "Misiones",
    //   "Neuquén",
    //   "Río Negro",
    //   "Salta",
    //   "San Juan",
    //   "San Luis",
    //   "Santa Cruz",
    //   "Santa Fe",
    //   "Santiago del Estero",
    //   "Tierra del Fuego, Antártida e Islas del Atlántico Sur",
    //   "Tucumán",
    // ],
    required: "A province is required",
  },
  zipCode: {
    type: String,
    lowercase: true,
    trim: true,
    required: "A zip code is required",
  },
  detail: {
    type: String,
    trim: true,
  },
  contact: {
    type: Number,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Address = mongoose.model("Address", addressSchema);

export default Address;
