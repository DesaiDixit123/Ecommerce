

import { createSlice } from "@reduxjs/toolkit";
import { AdminLoginFetchApi,VerifyAdminFetchApi } from "./AdminThunk";


const initialState = {
  loading: false,
  error: null,
  process: false,
  adminData: null,
  message: "",
  isAdmin: false,
 
};

const AdminSlice = createSlice({
  name: "AdminSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(AdminLoginFetchApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(AdminLoginFetchApi.fulfilled, (state, action) => {
        const { message, data, process } = action.payload;
        state.message = message;
        state.adminData = data;
        state.process = process;
        state.loading = false;
      })
      .addCase(AdminLoginFetchApi.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Login failed";
        state.process = false;
      })
      
      .addCase(VerifyAdminFetchApi.pending, (state) => {
        state.loading = true;
        state.message = "pending";
      })
      .addCase(VerifyAdminFetchApi.fulfilled, (state, action) => {
        state.adminData = action.payload.userData;
        state.isAdmin = action.payload.process;
        state.message = "fullfilled";
        state.loading = false;
      })
      .addCase(VerifyAdminFetchApi.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Verification failed";
      })

   
      
  },
});

export default AdminSlice.reducer;
