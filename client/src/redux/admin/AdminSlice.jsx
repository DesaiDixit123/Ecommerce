

import { createSlice } from "@reduxjs/toolkit";
import { AdminLoginFetchApi,VerifyAdminFetchApi } from "./AdminThunk";


const initialState = {
  loading: false,
  error: null,
  process: false,
  adminData: null,
  message: "",
  isAdmin: false,
  categories:[]
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

      // .addCase(categoryFetchApi.pending,(state)=>{
      //   state.loading=true
      // })
      // .addCase(categoryFetchApi.fulfilled,(state,action)=>{
      //   const {data,message}=action.payload
      //   state.categories=data
      //   state.message=message
      //   state.loading=false
      // })

      // .addCase(categoryFetchApi.rejected,(state,action)=>{
      //   state.loading=false,
      //   state.error=action.payload?.message || "Category fetch failled."
      // })

      // .addCase(getAllCategories.pending, (state) => {
      //   state.loading = false; // Set loading to true
      // })
      // .addCase(getAllCategories.fulfilled, (state, action) => {
      //   console.log("Payload:", action.payload); // Log the payload
      //   state.categories = action.payload.data; // Ensure payload structure matches
      //   state.message = action.payload.message;
      //   state.loading = false; // Set loading to false
      // })
      // .addCase(getAllCategories.rejected, (state, action) => {
      //   state.loading = false; // Set loading to false
      //   state.error = action.payload?.message || "Category fetch failed.";
      // });
      
  },
});

export default AdminSlice.reducer;
