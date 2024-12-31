import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state';

export const selectOffers = (state: State) => state.offer;
export const selectCurrentCity = (state: State) => state.currentCity;

export const selectCityOfferCards = createSelector(
  [selectOffers, selectCurrentCity],
  (offers, currentCity) => offers.filter((offer) => offer.city.name === currentCity.name)
);
