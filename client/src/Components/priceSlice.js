import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  calculatedPrices: [],
};

const priceSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    setPrices: (state, action) => {
      state.calculatedPrices = action.payload;
    },
  },
});

export const { setPrices } = priceSlice.actions;
export default priceSlice.reducer;
