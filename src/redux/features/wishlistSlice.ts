import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { TListing, TMongoose } from "@/types";

interface IInitialState {
  properties: (TListing & TMongoose)[];
}

const initialState: IInitialState = {
  properties: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<TListing & TMongoose>) => {
      const existingProperty = state.properties.find(
        (property) => property.listingId === action.payload.listingId
      );
      if (!existingProperty) {
        state.properties.push(action.payload);
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.properties = state.properties.filter(
        (property) => property.listingId !== action.payload
      );
    },
    clearWishlist: (state) => {
      state.properties = [];
    },
  },
});

export const wishlistSelector = (state: RootState) => {
  return state.wishlist.properties;
};

export const isInWishlistSelector =
  (listingId: string) => (state: RootState) => {
    return state.wishlist.properties.some(
      (property) => property.listingId === listingId
    );
  };

export const { addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;
export default wishlistSlice;
