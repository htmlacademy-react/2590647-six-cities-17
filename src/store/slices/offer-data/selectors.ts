import { State } from '../../../types/state';
import { NameSpace } from '../../../const';

export const selectOffers = (state: State) => state[NameSpace.Data].offers;

export const selectIsLoadingOffers = (state: State) => state[NameSpace.Data].isOffersLoading;

export const selectOfferById = (state: State) => state[NameSpace.Data].offer;

export const selectIsLoadingOffer = (state: State) => state[NameSpace.Data].isOfferLoading;

export const selectOffersNearById = (state: State) => state[NameSpace.Data].nearBy;

export const selectIsLoadingNearbyOffer = (state: State) => state[NameSpace.Data].isNearByLoading;

export const selectOfferComments = (state: State) => state[NameSpace.Data].reviews;

export const selectIsLoadingComments = (state: State) => state[NameSpace.Data].isReviewLoading;

export const selectIsLoadingPostComment = (state: State) => state[NameSpace.Data].PostCommentLoading;
