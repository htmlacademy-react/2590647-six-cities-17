import { createAction } from '@reduxjs/toolkit';
import { Offers, Offer, City } from '../types/offer';
import { UserComment } from '../types/comment';
import { Sort, LoginStatus } from '../const';

export const Actions = {
  CHANGE_CITY: 'changeCity',
  CHANGE_SORTING: 'changeSorting',
  LOAD_OFFERS: 'loadOffers',
  LOADING_OFFERS_STATUS: 'loadingOffersStatus',
  CHANGE_AUTHORIZATION_STATUS: 'changeAuthorizationStatus',
  LOAD_OFFER: 'loadOffer',
  LOADING_OFFER_STATUS: 'loadingOfferStatus',
  LOAD_NEARBY_OFFER: 'loadNearbyOffer',
  LOADING__NEARBY_OFFER_STATUS: 'loadingNearbyOfferStatus',
  LOAD_COMMENTS: 'loadComments',
  LOADING__COMMENTS_STATUS: 'loadingCommentsStatus',
  LOADING__COMMENTS_POST: 'loadingCommentsPost',
};

export const changeCity = createAction<City>(Actions.CHANGE_CITY);

export const changeSorting = createAction<Sort>(Actions.CHANGE_SORTING);

export const loadOffers = createAction<Offers[]>(Actions.LOAD_OFFERS);
export const setLoadingOffersStatus = createAction<boolean>(Actions.LOADING_OFFERS_STATUS);

export const changeAuthorizationStatus = createAction<LoginStatus>(Actions.CHANGE_AUTHORIZATION_STATUS);

export const loadOffer = createAction<Offer>(Actions.LOAD_OFFER);
export const setLoadingOfferStatus = createAction<boolean>(Actions.LOADING_OFFER_STATUS);

export const loadNearByOffer = createAction<Offers[]>(Actions.LOAD_NEARBY_OFFER);
export const setLoadingNearByOfferStatus = createAction<boolean>(Actions.LOADING__NEARBY_OFFER_STATUS);

export const loadComments = createAction<UserComment[]>(Actions.LOAD_COMMENTS);
export const setLoadingCommentsStatus = createAction<boolean>(Actions.LOADING__COMMENTS_STATUS);

export const setPostCommentLoading = createAction<boolean>(Actions.LOADING__COMMENTS_POST);

