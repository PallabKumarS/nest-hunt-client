import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface IInitialState {
  user: {
    userId: string;
    email: string;
    role: string;
    iat: number;
    exp: number;
  } | null;
}

const initialState: IInitialState = {
  user: {
    userId: "",
    email: "",
    role: "",
    iat: 0,
    exp: 0,
  },
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
});

export const userSelector = (state: RootState) => {
  return state.auth.user;
};

export const { login, logout } = authSlice.actions;
export default authSlice;
