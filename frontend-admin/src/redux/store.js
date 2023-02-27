import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice/userSlice";
import productReducer from "./slices/productSlice/productSlice";
import usersReducer from "./slices/usersSlice/usersSlice";
import salesReducer from "./slices/salesSlice/salesSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    users: usersReducer,
    sales: salesReducer,
  },
});
