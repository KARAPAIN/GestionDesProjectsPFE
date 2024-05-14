import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  token: localStorage.getItem("token")
    //Cookies.get("token") || null, // Read token from cookie
  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token; // Store token in Redux state
      localStorage.setItem("userInfo", JSON.stringify(action.payload.user));
      localStorage.setItem("token",action.payload.token, { expires: 1 })
     // Cookies.set("token", action.payload.token, { expires: 1 });
    },
    logout: (state, action) => {
      state.user = null;
      state.token = null; // Clear token from Redux state
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;

export default authSlice.reducer;
