import { configureStore } from '@reduxjs/toolkit';
import priceReducer from './priceSlice';
import offerReducer from './offerSlice';

const store = configureStore({
  reducer: {
    prices: priceReducer,
    offer: offerReducer,
  },
});

export default store;



