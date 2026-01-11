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
      state.loading
    },
    setShopLoading(state, action) {
      state.loading = action.payload;
    },
    setShopPush(state,action){
      state.shop.push(action.payload);
    }
  }
});

export const { setShop, setShopLoading,setShopPush } = shopSlice.actions;
export default shopSlice.reducer;
