import { createReducer } from '@reduxjs/toolkit';
import { Cities, Sort } from '../const';
import { Offer, City } from '../types/offer';
import { changeCity, changeSorting, loadOffers, setLoadingStatus } from './actions';

type InitialState = {
  currentCity: City;
  offer: Offer[];
  currentSort: Sort;
  isLoading: boolean;
}

const initialState: InitialState = {
  currentCity: Cities.PARIS,
  offer: [] as Offer[],
  currentSort: Sort.Popular,
  isLoading: false,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offer = action.payload;
    })

    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })

    .addCase(changeSorting, (state, action) => {
      state.currentSort = action.payload;
    })

    .addCase(setLoadingStatus, (state, action) => {
      state.isLoading = action.payload;
    });
});
