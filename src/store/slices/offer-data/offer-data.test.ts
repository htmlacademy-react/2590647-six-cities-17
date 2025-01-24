import {makeFakeOffer, makeFakeOfferFull, makeFakeReview} from '../../../mocks';
import {Offer, Offers} from '../../../types/offer';
import {UserComment} from '../../../types/comment';
import {fetchOfferComments, fetchNearbyOffers, fetchOffersAction, getOfferByID, postOfferComments, loadFavoriteOfferCard} from '../../api-actions';
import {offersData, OfferData} from './offer-data';

describe('OfferData Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: OfferData = {
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
    };

    const result = offersData.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: OfferData = {
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
    };

    const result = offersData.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersLoading" to "true" with "fetchOffersAction.pending"', () => {
    const expectedState: OfferData = {
      offers: [] as Offers[],
      isOffersLoading: true,
      offer: null,
      isOfferLoading: false,
      nearBy: [] as Offers[],
      isNearByLoading: false,
      isReviewLoading: false,
      reviews: [] as UserComment[],
      PostCommentLoading: false,
      favoriteOfferCards: [] as Offers[],
      favoriteOfferCardsLoading: false,
    };

    const result = offersData.reducer(undefined, fetchOffersAction.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offer" to Offers, "isOfferLoading" to "false" with "fetchOffersAction.fulfilled"', () => {
    const mockOffers = Array<Offers>(12).fill(makeFakeOffer());
    const expectedState: OfferData = {
      offers: mockOffers,
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
    };

    const result = offersData.reducer(
      undefined,
      fetchOffersAction.fulfilled(
        mockOffers, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isOffersLoading" to "false" with "fetchOffersAction.rejected', () => {
    const expectedState: OfferData = {
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
    };

    const result = offersData.reducer(
      undefined,
      fetchOffersAction.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewLoading" to "true" with "fetchOfferComments.pending"', () => {
    const expectedState: OfferData = {
      offers: [] as Offers[],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      nearBy: [] as Offers[],
      isNearByLoading: false,
      isReviewLoading: true,
      reviews: [] as UserComment[],
      PostCommentLoading: false,
      favoriteOfferCards: [] as Offers[],
      favoriteOfferCardsLoading: false,
    };

    const result = offersData.reducer(undefined, fetchOfferComments.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with review, "isReviewsDataLoading" to "false" with "fetchOfferComments.fulfilled"', () => {
    const mockReviews = Array<UserComment>(12).fill(makeFakeReview());
    const expectedState: OfferData = {
      offers: [] as Offers[],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      nearBy: [] as Offers[],
      isNearByLoading: false,
      isReviewLoading: false,
      reviews: mockReviews,
      PostCommentLoading: false,
      favoriteOfferCards: [] as Offers[],
      favoriteOfferCardsLoading: false,
    };

    const result = offersData.reducer(
      undefined,
      fetchOfferComments.fulfilled(
        mockReviews, '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isReviewLoading" to "false" with "fetchOfferComments.rejected', () => {
    const expectedState: OfferData = {
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
    };

    const result = offersData.reducer(
      undefined,
      fetchOfferComments.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isNearByLoading" to "true" with "fetchNearbyOffers.pending"', () => {
    const expectedState: OfferData = {
      offers: [] as Offers[],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      nearBy: [] as Offers[],
      isNearByLoading: true,
      isReviewLoading: false,
      reviews: [] as UserComment[],
      PostCommentLoading: false,
      favoriteOfferCards: [] as Offers[],
      favoriteOfferCardsLoading: false,
    };

    const result = offersData.reducer(undefined, fetchNearbyOffers.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "nearBy" to array with offer, "isNearByLoading" to "false", with "fetchNearbyOffers.fulfilled"', () => {
    const mockNearBy = Array<Offers>(12).fill(makeFakeOffer());
    const expectedState: OfferData = {
      offers: [] as Offers[],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      nearBy: mockNearBy,
      isNearByLoading: false,
      isReviewLoading: false,
      reviews: [] as UserComment[],
      PostCommentLoading: false,
      favoriteOfferCards: [] as Offers[],
      favoriteOfferCardsLoading: false,
    };

    const result = offersData.reducer(
      undefined,
      fetchNearbyOffers.fulfilled(
        mockNearBy, '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isNearByLoading" to "false"" with "fetchNearbyOffers.rejected', () => {
    const expectedState: OfferData = {
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
    };

    const result = offersData.reducer(
      undefined,
      fetchNearbyOffers.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferLoading" to "true" with "getOfferByID.pending"', () => {
    const expectedState: OfferData = {
      offers: [] as Offers[],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: true,
      nearBy: [] as Offers[],
      isNearByLoading: false,
      isReviewLoading: false,
      reviews: [] as UserComment[],
      PostCommentLoading: false,
      favoriteOfferCards: [] as Offers[],
      favoriteOfferCardsLoading: false,
    };

    const result = offersData.reducer(undefined, getOfferByID.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "offer" to array with offer, "isOfferLoading" to "false" with "getOfferByID.fulfilled"', () => {
    const mockOffer: Offer = makeFakeOfferFull();
    const expectedState: OfferData = {
      offers: [] as Offers[],
      isOffersLoading: false,
      offer: mockOffer,
      isOfferLoading: false,
      nearBy: [] as Offers[],
      isNearByLoading: false,
      isReviewLoading: false,
      reviews: [] as UserComment[],
      PostCommentLoading: false,
      favoriteOfferCards: [] as Offers[],
      favoriteOfferCardsLoading: false,
    };

    const result = offersData.reducer(
      undefined,
      getOfferByID.fulfilled(
        mockOffer, '', '')
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isOfferLoading" to "false"" with "getOfferByID.rejected', () => {
    const expectedState: OfferData = {
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
    };

    const result = offersData.reducer( undefined, getOfferByID.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "PostCommentLoading" to "true" with "postOfferComments.pending"', () => {
    const expectedState: OfferData = {
      offers: [] as Offers[],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      nearBy: [] as Offers[],
      isNearByLoading: false,
      isReviewLoading: false,
      reviews: [] as UserComment[],
      PostCommentLoading: true,
      favoriteOfferCards: [] as Offers[],
      favoriteOfferCardsLoading: false,
    };

    const result = offersData.reducer(undefined, postOfferComments.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "reviews" to array with added review, "PostCommentLoading" to "false" with "postOfferComments.fulfilled"', () => {
    const addedReview = makeFakeReview();
    const expectedState: OfferData = {
      offers: [] as Offers[],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      nearBy: [] as Offers[],
      isNearByLoading: false,
      isReviewLoading: false,
      reviews: [addedReview],
      PostCommentLoading: false,
      favoriteOfferCards: [] as Offers[],
      favoriteOfferCardsLoading: false,
    };

    const result = offersData.reducer(
      undefined,
      postOfferComments.fulfilled(
        addedReview, '', {
          id: 'some offer id',
          comment:{
            review: 'some text',
            rating: 1,
          }
        })
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "PostCommentLoading" to "false" with "postOfferComments.rejected', () => {
    const expectedState: OfferData = {
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
    };

    const result = offersData.reducer(
      undefined,
      postOfferComments.rejected
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteOfferCardsLoading" to "true" with "loadFavoriteOfferCard.pending"', () => {
    const expectedState: OfferData = {
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
      favoriteOfferCardsLoading: true,
    };

    const result = offersData.reducer(undefined, loadFavoriteOfferCard.pending);

    expect(result).toEqual(expectedState);
  });

  it('should set "favoriteOfferCards" to array with offer, "isFavoriteListDataLoading" to "false" with "loadFavoriteOfferCard.fulfilled"', () => {
    const mockOffers = Array<Offers>(12).fill(makeFakeOffer());
    const expectedState: OfferData = {
      offers: [] as Offers[],
      isOffersLoading: false,
      offer: null,
      isOfferLoading: false,
      nearBy: [] as Offers[],
      isNearByLoading: false,
      isReviewLoading: false,
      reviews: [] as UserComment[],
      PostCommentLoading: false,
      favoriteOfferCards: mockOffers,
      favoriteOfferCardsLoading: false,
    };

    const result = offersData.reducer(
      undefined,
      loadFavoriteOfferCard.fulfilled(
        mockOffers, '', undefined)
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "isFavoriteListDataLoading" to "false" with "loadFavoriteOfferCard.rejected', () => {
    const expectedState: OfferData = {
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
    };

    const result = offersData.reducer(
      undefined,
      loadFavoriteOfferCard.rejected
    );

    expect(result).toEqual(expectedState);
  });
});