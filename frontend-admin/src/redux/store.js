import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice/userSlice";
import productReducer from "./slices/productSlice/productSlice";
import usersReducer from "./slices/usersSlice/usersSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    products: productReducer,
    users: usersReducer,
  },
});
