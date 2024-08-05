/* eslint-disable react-refresh/only-export-components */
import { createSlice } from "@reduxjs/toolkit";
import {
  ForgetPasswords,
  getAllCountriesWithPhoneCodes,
  UserValidation,
} from "./UserThunk";

const initialState = {
  countrieswithphonecode: [],
  loading: false,
  error: null,
  forgetPasswordProcess: null,
  userData: [],
  message: "",
  process: false,
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
        const { message, process, userData } = action.payload;
        state.loading = false;
        state.message = message;
        state.process = process;
state.userData =userData;
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
      });
  },
});

export default UserSlice.reducer;
