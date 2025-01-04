import { createReducer } from '@reduxjs/toolkit';
import { Cities, Sort, LoginStatus } from '../const';
import { Offers, Offer, City } from '../types/offer';
import { UserComment } from '../types/comment';
import {
  changeCity,
  changeSorting,
  loadOffers,
  setLoadingOffersStatus,
  changeAuthorizationStatus,
  loadOffer,
  setLoadingOfferStatus,
  loadNearByOffer,
  setLoadingNearByOfferStatus,
  loadComments,
  setLoadingCommentsStatus,
  setPostCommentLoading
} from './actions';

type InitialState = {
  currentCity: City;
  offers: Offers[];
  currentSort: Sort;
  isOffersLoading: boolean;
  offer: Offer | null;
  isOfferLoading: boolean;
  nearBy: Offers[];
  isNearByLoading: boolean;
  reviews: UserComment[];
  isReviewLoading: boolean;
  PostCommentLoading: boolean;
  authorizationStatus: LoginStatus;
}

const initialState: InitialState = {
  currentCity: Cities.PARIS,
  offers: [] as Offers[],
  currentSort: Sort.Popular,
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
  nearBy: [] as Offers[],
  isNearByLoading: false,
  isReviewLoading: false,
  reviews: [] as UserComment[],
  PostCommentLoading: false,
  authorizationStatus: LoginStatus.Unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })

    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })

    .addCase(changeSorting, (state, action) => {
      state.currentSort = action.payload;
    })

    .addCase(setLoadingOffersStatus, (state, action) => {
      state.isOffersLoading = action.payload;
    })

    .addCase(changeAuthorizationStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })

    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
    })

    .addCase(setLoadingOfferStatus, (state, action) => {
      state.isOfferLoading = action.payload;
    })

    .addCase(loadNearByOffer, (state, action) => {
      state.nearBy = action.payload;
    })

    .addCase(setLoadingNearByOfferStatus, (state, action) => {
      state.isNearByLoading = action.payload;
    })

    .addCase(loadComments, (state, action) => {
      state.reviews = action.payload;
    })

    .addCase(setLoadingCommentsStatus, (state, action) => {
      state.isReviewLoading = action.payload;
    })

    .addCase(setPostCommentLoading, (state, action) => {
      state.PostCommentLoading = action.payload;
    });
});
