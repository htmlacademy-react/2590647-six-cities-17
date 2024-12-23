import { createReducer } from '@reduxjs/toolkit';
import { Cities } from '../const';
import { Offer } from '../types/offer';
import { saveOffers, changeCity } from '../store/action';

const initialState = {
  currentCity: Cities.PARIS,
  offer: [] as Offer[],
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(saveOffers, (state, action) => {
      state.offer = action.payload;
    })

    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
});