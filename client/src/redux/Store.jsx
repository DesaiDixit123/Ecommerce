import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./user/UserSlice";

export const Store = configureStore({
  reducer: {
    UserSliceProvider: UserSlice,
  },
});
