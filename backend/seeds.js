import { createUserLocal } from "./src/controllers/authControllers.js";
import User from "./src/db/models/user.js";

export async function createSuperAdmin() {
  try {
    let superAdmin = await User.findOne({
      email: "a@a.com",
    }).exec();
    if (!superAdmin) {
      superAdmin = await User.register(
        { email: "a@a.com", username: "a@a.com", role: "superadmin" },
        "Asd123"
      );
      console.log("superAdmin creado", superAdmin.email);
    }
  } catch (error) {
    console.log("error al crear super admin", error);
  }
}