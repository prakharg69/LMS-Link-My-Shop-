import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  digitalSite: [],
};

export const DigitalSlice = createSlice({
  name: "listing",
  initialState,
  reducers: {
    setDigital: (state, action) => {
      state.digitalSite = action.payload; 
    },
  },
});


export const { setDigital } = DigitalSlice.actions;


export default DigitalSlice.reducer;
