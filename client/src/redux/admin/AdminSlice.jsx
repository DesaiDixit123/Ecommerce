import { createSlice } from "@reduxjs/toolkit";
import { AdminLoginFetchApi, VerifyAdminFetchApi } from "./AdminThunk";

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
        state.adminData = data; // Data will now be set correctly
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
        console.log("Action Payload in fulfilled:", action.payload); // Debugging
        state.adminData = action.payload;
        state.isAdmin = action.payload.process;
        state.message = "fulfilled";
        state.loading = false;
      })

      .addCase(VerifyAdminFetchApi.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Verification failed";
      });
  },
});

export default AdminSlice.reducer;
