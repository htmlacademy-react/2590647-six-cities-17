import { createSlice } from '@reduxjs/toolkit';
import { fetchOffersAction, getOfferByID, fetchNearbyOffers, fetchOfferComments, postOfferComments, loadFavoriteOfferCard, uploadFavoriteStatus } from '../../api-actions';
import { Offers, Offer } from '../../../types/offer';
import { UserComment } from '../../../types/comment';
import { NameSpace } from '../../../const';


type OfferData = {
  offers: Offers[];
  isOffersLoading: boolean;
  offer: Offer | null;
  isOfferLoading: boolean;
  nearBy: Offers[];
  isNearByLoading: boolean;
  reviews: UserComment[];
  isReviewLoading: boolean;
  PostCommentLoading: boolean;
  favoriteOfferCards: Offers[];
  favoriteOfferCardsLoading: boolean;
}

const initialState: OfferData = {
  offers: [] as Offers[],
  isOffersLoading: false,
  offer: null,
  isOfferLoading: false,
  nearBy: [] as Offers[],
  isNearByLoading: false,
  isReviewLoading: false,
  reviews: [] as UserComment[],
  PostCommentLoading: false,
  favoriteOfferCards: [] as Offers[],
  favoriteOfferCardsLoading: false,
}

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersLoading = true;
      })

      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersLoading = false;
      })

      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersLoading = false;
      })

      .addCase(getOfferByID.pending, (state) => {
        state.isOfferLoading = true;
      })

      .addCase(getOfferByID.rejected, (state) => {
        state.isOfferLoading = false;
      })

      .addCase(getOfferByID.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferLoading = false;
      })

      .addCase(fetchNearbyOffers.pending, (state) => {
        state.isNearByLoading = true;
      })

      .addCase(fetchNearbyOffers.rejected, (state) => {
        state.isNearByLoading = false;
      })

      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearBy = action.payload;
        state.isNearByLoading = false;
      })

      .addCase(fetchOfferComments.pending, (state) => {
        state.isReviewLoading = true;
      })

      .addCase(fetchOfferComments.rejected, (state) => {
        state.isReviewLoading = false;
      })

      .addCase(fetchOfferComments.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isReviewLoading = false;
      })

      .addCase(postOfferComments.pending, (state) => {
        state.PostCommentLoading = true;
      })

      .addCase(postOfferComments.rejected, (state) => {
        state.PostCommentLoading = false;
      })

      .addCase(postOfferComments.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.PostCommentLoading = false;
      })

      .addCase(loadFavoriteOfferCard.pending, (state) => {
        state.favoriteOfferCardsLoading = true;
      })

      .addCase(loadFavoriteOfferCard.rejected, (state) => {
        state.favoriteOfferCardsLoading = false;
      })

      .addCase(loadFavoriteOfferCard.fulfilled, (state, action) => {
        state.favoriteOfferCards = action.payload;
        state.favoriteOfferCardsLoading = false;
      })

      .addCase(uploadFavoriteStatus.fulfilled, (state, action) => {
        if (action.payload.isFavorite) {
          state.favoriteOfferCards.push(action.payload);
        } else {
          const favoriteIndex = state.favoriteOfferCards.findIndex((offer) => offer.id === action.payload.id);
          state.favoriteOfferCards.splice(favoriteIndex, 1)
        }
      });
  }
});
