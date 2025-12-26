import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shop: null,
  hasWebsite: false,   
  isOnboarded: false,   
  loading: false
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    setShop(state, action) {
      state.shop = action.payload;
      state.hasWebsite = action.payload?.hasWebsite || false;
      state.isOnboarded = true;
    },
    setShopLoading(state, action) {
      state.loading = action.payload; 
    }
  }
});

export const { setShop, setShopLoading } = shopSlice.actions;
export default shopSlice.reducer;
