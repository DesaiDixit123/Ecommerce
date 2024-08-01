import { createSlice } from "@reduxjs/toolkit";
import { getAllCountriesWithPhoneCodes } from "./UserThunk";

const initialState = {
  countrieswithphonecode: [],
  loading: true,
  error: null,
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
        console.log("Fetched countries data:", action.payload); // Log the data here
        state.loading = false;
        state.countrieswithphonecode = action.payload;
      })
      .addCase(getAllCountriesWithPhoneCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default UserSlice.reducer;
