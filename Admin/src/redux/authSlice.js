import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("authToken"),
  token: localStorage.getItem("authToken") || null,
  role: localStorage.getItem("userRole") || null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      // console.log(state, action,'=====state, action=====')
      state.isAuthenticated = true;
      state.token = action?.payload?.data?.token;
      state.role = action?.payload?.data?.role;  
      localStorage.setItem("authToken", action.payload?.data?.token);
      localStorage.setItem("userRole", action.payload?.data?.role); 
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
