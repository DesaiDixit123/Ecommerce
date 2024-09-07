/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";

import {
  categoryByFieldsFetchApi,
  fetchAllCitiesByStateAndCountry,
  fetchAllCountries,
  fetchAllStatesByCountry,

  fetchPlaceOrderApi,

  fetchRelatedProducts,
  filterProductsByCategory,
  filterProductsByRange,
  ForgetPasswords,
  getAllCategories2,
  // getAllCategories,
  getAllCountriesWithPhoneCodes,
  getAllOrdersByUserId,
  getAllOrdersShowByAdmin,
  getAllProductsFecthApi,
  getCartByUserId,
  LoginUser,
  searchProducts,
  updateCart,
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
  addCart: [],
  userCart: [],
  items: [],
  totalAmount: 0,
  shippingCost: 0,
  relatedProducts: [],
  country: [],
  states: [],
  allCity: [],
  order: null,
  UserOrders: [],
  AllOrders:[]
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
        console.log(action.payload);
        state.addCart = action.payload;
        state.loading = false;
      })
      .addCase(userAddToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getCartByUserId.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartByUserId.fulfilled, (state, action) => {
        console.log("Fetched cart data:", action.payload);
        state.loading = false;
        state.userCart = action.payload;
      })

      .addCase(getCartByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update state with the new cart data
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
        state.shippingCost = action.payload.shippingCost;
        state.error = null;
      })
      .addCase(updateCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
      });
    builder
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        console.error("Thunk Error:", action.error.message); // Better error logging
      })

      .addCase(fetchAllCountries.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.country = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchAllStatesByCountry.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllStatesByCountry.fulfilled, (state, action) => {
        console.log(action.payload);
        state.loading = false;
        state.states = action.payload;
      })
      .addCase(fetchAllStatesByCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchAllCitiesByStateAndCountry.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAllCitiesByStateAndCountry.fulfilled, (state, action) => {
        console.log("Action Payload (allCity):", action.payload); // Undefined batavse jo API call fail thai
        state.loading = false;
        state.allCity = action.payload; // Undefined store thai jase
      })

      .addCase(fetchAllCitiesByStateAndCountry.rejected, (state, action) => {
        console.log("API call failed:", action.payload);
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchPlaceOrderApi.pending, (state) => {
        state.loading = 'loading';
      })
      .addCase(fetchPlaceOrderApi.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        state.order = action.payload;
      })
      .addCase(fetchPlaceOrderApi.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.payload;
      })
    
      .addCase(getAllOrdersByUserId.pending, (state) => {
        state.loading = true
      })
    
      .addCase(getAllOrdersByUserId.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.loading = false,
          state.UserOrders = action.payload
      })
      .addCase(getAllOrdersByUserId.rejected, (state, action) => {
        state.loading = "failled",
          state.UserOrders=action.payload
      })
      .addCase(getAllOrdersShowByAdmin.pending, (state) => {
        state.loading = true
      })
    
      .addCase(getAllOrdersShowByAdmin.fulfilled, (state, action) => {
        console.log(action.payload)
        state.loading = false,
          state.AllOrders = action.payload
      })
      .addCase(getAllOrdersShowByAdmin.rejected, (state, action) => {
        state.loading = "failled",
          state.AllOrders=action.payload
      })
  
    
  },
});

export default UserSlice.reducer;
