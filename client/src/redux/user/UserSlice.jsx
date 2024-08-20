/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import {
  categoryByFieldsFetchApi,
  ForgetPasswords,
  getAllCategories2,
  // getAllCategories,
  getAllCountriesWithPhoneCodes,
  getAllProductsFecthApi,
  getAllUsersFetchApi,
  LoginUser,
  userLogoutFecthApi,
  UserValidation,
} from "./UserThunk";

const initialState = {
  countrieswithphonecode: [],
  loading: false,
  error: null,
  forgetPasswordProcess: null,
  userData:null,
  message: "",
  process: false,
  allProducts:[],
  categoriesData:[],
  categoryFields: [],
  allUsers:[],
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

    .addCase(UserValidation.pending, (state) => {
      state.loading = true;
    })

    .addCase(UserValidation.fulfilled, (state, action) => {
      console.log(action.payload.data)
      const { message, process, userData } = action.payload;
      state.loading = false;
      state.message = message;
      state.process = process;
      if (process) state.userData = userData;
    })

    .addCase(UserValidation.rejected, (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.process = false;
    })

      .addCase(getAllCountriesWithPhoneCodes.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCountriesWithPhoneCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.countrieswithphonecode = action.payload;
      })
      .addCase(getAllCountriesWithPhoneCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(ForgetPasswords.pending, (state) => {
        state.loading = true;
      })
      .addCase(ForgetPasswords.fulfilled, (state, action) => {
        state.loading = false;
        state.forgetPasswordProcess = action.payload;
      })
      .addCase(ForgetPasswords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(LoginUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.userData = action.payload.data;
        state.process = true;
      })

      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.message = action.payload;
        state.process = false;
      })
      .addCase(userLogoutFecthApi.pending, (state) => {
        state.loading = true;
      })

      .addCase(userLogoutFecthApi.fulfilled, (state) => {
        state.loading = false;
        state.userData = null;
      })

      .addCase(getAllProductsFecthApi.pending,(state)=>{
        state.loading=true
      })

      .addCase(getAllProductsFecthApi.fulfilled,(state,action)=>{
        console.log(action.payload)
        state.loading=false
        state.allProducts=action.payload
      })

      .addCase(getAllUsersFetchApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllUsersFetchApi.fulfilled, (state, action) => {
        console.log("Action Payload (all users):", action.payload); // Check Data
        state.loading = false;
        state.allUsers = action.payload; // Update State
      })
      
      .addCase(getAllUsersFetchApi.rejected, (state, action) => {
        console.log("Action Error:", action.error.message); // Error Logging
        state.loading = false;
        state.error = action.error.message;
      })
    

     

      .addCase(getAllCategories2.pending,(state)=>{
        state.loading=true
      })

      .addCase(getAllCategories2.fulfilled,(state,action)=>{
        
        state.loading=false
        state.categoriesData=action.payload
      })

      .addCase(getAllCategories2.rejected,(state,action)=>{
        state.loading=false,
        state.error=action.payload
      })

      .addCase(categoryByFieldsFetchApi.pending,(state)=>{
        state.loading=true
       })
       .addCase(categoryByFieldsFetchApi.fulfilled,(state,action)=>{
        state.categoryFields=action.payload
        state.loading=false
       })
       .addCase(categoryByFieldsFetchApi.rejected,(state,action)=>{
        state.loading=false
        state.action=action.payload
       })
    
  
  },
});

export default UserSlice.reducer;
