import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedOffer: "Kapsamlı",
  selectedAdditionalCoverage: [],
  totalPrice: 0,
  offerPrices: {
    "Standart": 50,
    "Kapsamlı": 60,
    "Geniş Kapsamlı": 70,
  },
};

const offerSlice = createSlice({
  name: 'offer',
  initialState,
  reducers: {
    setSelectedOffer(state, action) {
      state.selectedOffer = action.payload;
    },
    setSelectedAdditionalCoverage(state, action) {
      state.selectedAdditionalCoverage = action.payload;
    },
    calculateTotalPrice(state, action) {
      const offers = action.payload.offers; // Offers listesi action payload'dan alınıyor
      console.log('Offers:', offers);
      
      const baseOffer = offers.find((offer) => offer.name === state.selectedOffer);
      console.log('Base Offer:', baseOffer);
      
      // Eğer baseOffer mevcut değilse, offerPrices içinden fiyatı al
      const basePrice = baseOffer 
        ? parseFloat(baseOffer.price.replace(/[^0-9,.]/g, "")) 
        : state.offerPrices[state.selectedOffer] || 0;
      console.log('Base Price:', basePrice);

      const additionalCoveragePrice = state.selectedAdditionalCoverage.length * 150;
      console.log('Additional Coverage Price:', additionalCoveragePrice);

      state.totalPrice = (
        (basePrice || 0) +
        additionalCoveragePrice
      ).toFixed(2); 

      console.log('Total Price:', state.totalPrice);
    },
  },
});

export const { setSelectedOffer, setSelectedAdditionalCoverage, calculateTotalPrice } = offerSlice.actions;
export default offerSlice.reducer;
