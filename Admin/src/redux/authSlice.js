import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"),
  token: localStorage.getItem("authToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("authToken");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
