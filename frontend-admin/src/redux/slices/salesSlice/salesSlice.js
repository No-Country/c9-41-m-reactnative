import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sales: [],
  saleDetails: {},
};

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setSales: (state, action) => {
      state.sales = action.payload;
    },
    setSaleDetails: (state, action) => {
      state.saleDetails = action.payload;
    },
  },
});

export const { setSales, setSaleDetails } = salesSlice.actions;

export default salesSlice.reducer;
