// src/slices/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoggedIn: false,
    userInfo: null, // Store additional user info
  },
  reducers: {
    logIn: (state) => {
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.userInfo = null; // Clear user info on logout
    },
    setUser: (state, action) => {
      state.userInfo = action.payload; // Update user info with the entire user object
    },
  },
});
export const { logIn, logOut, setUser } = userSlice.actions;
export default userSlice.reducer;
