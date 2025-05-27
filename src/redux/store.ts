import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "./storage";
import authSlice from "./features/authSlice";
import wishlistSlice from "./features/wishlistSlice";

const persistOptions = {
  key: "auth",
  storage,
};

const persistOptionsWishlist = {
  key: "wishlist",
  storage,
};

const persistedAuth = persistReducer(persistOptions, authSlice.reducer);
const persistedWishlist = persistReducer(
  persistOptionsWishlist,
  wishlistSlice.reducer
);

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: persistedAuth,
      wishlist: persistedWishlist,
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    middleware: (getDefaultMiddlewares: any) =>
      getDefaultMiddlewares({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
