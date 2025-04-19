import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!sessionStorage.getItem("authToken"),
  token: sessionStorage.getItem("authToken") || null,
  role: sessionStorage.getItem("userRole") || null, 
  id:sessionStorage.getItem("id") || null, 
  email:sessionStorage.getItem("email") || null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.token = action?.payload?.data?.token;
      state.role = action?.payload?.data?.role;  
      state.id = action?.payload?.data?._id; 
      state.email = action?.payload?.data?.email; 
      sessionStorage.setItem("authToken", action.payload?.data?.token);
      sessionStorage.setItem("userRole", action.payload?.data?.role); 
      sessionStorage.setItem("id", action.payload?.data?._id);
      sessionStorage.setItem("email", action.payload?.data?.email);
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
