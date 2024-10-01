import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./user/UserSlice";
import AdminSlice from "./admin/AdminSlice";
import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  combineReducers({
    UserSliceProvider: UserSlice,
    AdminSliceProvider: AdminSlice,

  })
);
export const Store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddlerware) =>
    getDefaultMiddlerware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});


export const persisterStore = persistStore(Store);
