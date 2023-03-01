import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productDetail: {},
  categories: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // PRODUCTS
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setNewProduct: (state, action) => {
      state.products.push(action.payload);
    },
    setDeleteProduct: (state, action) => {
      state.products = state.products.filter((i) => i._id !== action.payload);
    },
    setModifyProduct: (state, action) => {
      const idx = state.products.findIndex((i) => i._id === action.payload._id);
      const products = state.products;
      products[idx] = action.payload;
      state.products = products;
    },
    // CATEGORIES
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setNewCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    setModifyCategory: (state, action) => {
      const idx = state.categories.findIndex(
        (i) => i._id === action.payload._id
      );
      const categories = state.categories;
      categories[idx] = action.payload;
      state.categories = categories;
    },
    setDeleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (i) => i._id !== action.payload
      );
    },
  },
});

export const {
  setProducts,
  setNewProduct,
  setDeleteProduct,
  setModifyProduct,
  setCategories,
  setNewCategory,
  setModifyCategory,
  setDeleteCategory,
} = productSlice.actions;

export default productSlice.reducer;
