import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
  userDetails: {},
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    modifyUser: (state, action) => {
      const idx = state.users.findIndex((i) => i._id === action.payload._id);
      const users = state.users;
      users[idx] = action.payload;
      state.users = users;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
  },
});

export const { setUsers, modifyUser, setUserDetails } = usersSlice.actions;

export default usersSlice.reducer;
