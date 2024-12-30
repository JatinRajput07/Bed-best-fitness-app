import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!sessionStorage.getItem("authToken"),
  token: sessionStorage.getItem("authToken") || null,
  role: sessionStorage.getItem("userRole") || null, 
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
      sessionStorage.setItem("authToken", action.payload?.data?.token);
      sessionStorage.setItem("userRole", action.payload?.data?.role); 
    },
    logout(state) {
      state.isAuthenticated = false;
      state.token = null;
      state.role = null;
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userRole");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
