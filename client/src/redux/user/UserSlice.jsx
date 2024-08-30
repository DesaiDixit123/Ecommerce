/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

import {
  categoryByFieldsFetchApi,
  filterProductsByCategory,
  filterProductsByRange,
  ForgetPasswords,
  getAllCategories2,
  // getAllCategories,
  getAllCountriesWithPhoneCodes,
  getAllProductsFecthApi,
  LoginUser,
  searchProducts,
  userAddToCart,
  userLogoutFecthApi,
  UserValidation,
} from "./UserThunk";

const initialState = {
  countrieswithphonecode: [],
  loading: false,
  error: null,
  forgetPasswordProcess: null,
  userData: null,
  message: "",
  process: false,
  allProducts: [],
  categoriesData: [],
  categoryFields: [],
  allUsers: [],
  filteredProducts: [],
  filteredProducts1: [],
  searchResults: [],
  addCart:[]
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder

      .addCase(UserValidation.pending, (state) => {
        state.loading = true;
      })

      .addCase(UserValidation.fulfilled, (state, action) => {
        console.log(action.payload.data);
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

      .addCase(getAllProductsFecthApi.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllProductsFecthApi.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.allProducts = action.payload;
      })

      .addCase(filterProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredProducts = action.payload;
      })
      .addCase(filterProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(filterProductsByRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterProductsByRange.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.filteredProducts1 = action.payload; // <-- Store filtered products
      })
      .addCase(filterProductsByRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.searchResults = action.payload; // <-- Store filtered products
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getAllCategories2.pending, (state) => {
        state.loading = true;
      })

      .addCase(getAllCategories2.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesData = action.payload;
      })

      .addCase(getAllCategories2.rejected, (state, action) => {
        (state.loading = false), (state.error = action.payload);
      })

      .addCase(categoryByFieldsFetchApi.pending, (state) => {
        state.loading = true;
      })
      .addCase(categoryByFieldsFetchApi.fulfilled, (state, action) => {
        state.categoryFields = action.payload;
        state.loading = false;
      })
      .addCase(categoryByFieldsFetchApi.rejected, (state, action) => {
        state.loading = false;
        state.action = action.payload;
      })
    
      .addCase(userAddToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(userAddToCart.fulfilled, (state, action) => {
   
        console.log(action.payload)
        state.addCart = action.payload
        state.loading = false;
      })
      .addCase(userAddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default UserSlice.reducer;
