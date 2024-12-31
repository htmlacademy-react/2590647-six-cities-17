import { createReducer } from '@reduxjs/toolkit';
import { Cities, Sort } from '../const';
import { Offer } from '../types/offer';
import { saveOffers, changeCity, changeSorting } from '../store/action';

const initialState = {
  currentCity: Cities.PARIS,
  offer: [] as Offer[],
  currentSort: Sort.Popular,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(saveOffers, (state, action) => {
      state.offer = action.payload;
    })

    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })

    .addCase(changeSorting, (state, action) => {
      state.currentSort = action.payload;
    });
});
