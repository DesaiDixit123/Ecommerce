/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import { ForgetPasswords, getAllCountriesWithPhoneCodes } from "./UserThunk";

const initialState = {
  countrieswithphonecode: [],
  loading: true,
  error: null,
  forgetPasswordProcess: null,
};

const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export default UserSlice.reducer;
