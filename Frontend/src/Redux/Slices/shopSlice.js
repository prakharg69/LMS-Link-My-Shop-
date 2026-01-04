import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: [],
  isOnboarded: false,
  loading: false
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShop(state, action) {
      state.shop= action.payload;
      state.isOnboarded = state.shop.length > 0;
    },
    setShopLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { setShop, setShopLoading } = shopSlice.actions;
export default shopSlice.reducer;
