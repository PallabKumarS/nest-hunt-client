import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { clearWishlist } from "./wishlistSlice";

interface IInitialState {
  user: {
    role: "admin" | "tenant" | "landlord";
    phone?: string;
    address?: string;
    passwordChangedAt?: Date;
    isDeleted: boolean;
    isActive: boolean;
    profileImage?: string;
    name: string;
    _id: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    userId: string;
    email: string;
  } | null;
}

const initialState: IInitialState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(clearWishlist, (state) => {});
  },
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const logoutUser = () => (dispatch: any) => {
  dispatch(logout());
  dispatch(clearWishlist());
};

export const userSelector = (state: RootState) => {
  return state.auth.user;
};

export const { login, logout } = authSlice.actions;
export default authSlice;
