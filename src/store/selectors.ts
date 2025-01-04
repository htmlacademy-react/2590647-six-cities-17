import { createSelector } from '@reduxjs/toolkit';
import { State } from '../types/state';
import { LoginStatus } from '../const';

export const selectIsAuthorized = (state: State) => state.authorizationStatus === LoginStatus.Auth;
export const selectOffers = (state: State) => state.offers;
export const selectCurrentCity = (state: State) => state.currentCity;
export const selectOfferById = (state: State) => state.offer;
export const selectIsLoadingOffer = (state: State) => state.isOfferLoading;
export const selectOffersNearById = (state: State) => state.nearBy;
export const selectIsLoadingNearbyOffer = (state: State) => state.isNearByLoading;
export const selectOfferComments = (state: State) => state.reviews;
export const selectIsLoadingComments = (state: State) => state.isReviewLoading;
export const selectIsLoadingPostComment = (state: State) => state.PostCommentLoading;

export const selectCityOfferCards = createSelector(
  [selectOffers, selectCurrentCity],
  (offers, currentCity) => offers.filter((offer) => offer.city.name === currentCity.name)
);
