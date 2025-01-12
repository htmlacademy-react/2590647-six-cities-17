import { createSelector } from '@reduxjs/toolkit';
import { selectOffers } from './slices/offer-data/selectors';
import { selectCurrentCity } from './slices/main-process/selectors';

export const selectCityOfferCards = createSelector(
  [selectOffers, selectCurrentCity],
  (offers, currentCity) => offers.filter((offer) => offer.city.name === currentCity.name)
);
