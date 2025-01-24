import {configureMockStore} from '@jedmao/redux-mock-store';
import { PayloadAction } from '@reduxjs/toolkit';
import {createAPI} from '../services/api';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {fetchOffersAction, checkLoginStatus, loginAction, logoutAction, getOfferByID, fetchNearbyOffers, fetchOfferComments, postOfferComments, loadFavoriteOfferCard} from './api-actions';
import {ApiRoute} from '../const';
import * as tokenStorage from '../services/token';
import {State} from '../types/state';
import {AuthData} from '../types/auth';
import {Offers} from '../types/offer';
import {PostComment} from '../types/comment';
import {AppThunkDispatch, extractActionsTypes, makeFakeOffer, makeFakeOfferFull, makeFakeReview, makeFakeUserData} from '../mocks';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<State, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({ DATA: { offers: [] }});
  });

  describe('checkLoginStatus', () => {
    it('should dispatch "checkLoginStatus.pending" and "checkLoginStatus.fulfilled" with thunk "checkLoginStatus', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(200);

      await store.dispatch(checkLoginStatus());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkLoginStatus.pending.type,
        checkLoginStatus.fulfilled.type,
      ]);
    });

    it('should dispatch "checkAuthAction.pending" and "checkAuthAction.rejected" when server response 400', async() => {
      mockAxiosAdapter.onGet(ApiRoute.Login).reply(400);

      await store.dispatch(checkLoginStatus());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        checkLoginStatus.pending.type,
        checkLoginStatus.rejected.type,
      ]);
    });
  });

  describe('loginAction', () => {
    it('should dispatch "loginAction.pending", "saveUserName", "loginAction.fulfilled" when server responds with 200', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456a' };
      const fakeServerReplay = makeFakeUserData();
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, fakeServerReplay);
    
      await store.dispatch(loginAction(fakeUser));
    
      const emittedActions = store.getActions();
    
      const saveUserNameAction = emittedActions.find(
        (action): action is PayloadAction<string | null> =>
          action.type === 'MAIN/saveUserName',
      );
    
      expect(saveUserNameAction).toBeDefined();
      expect(saveUserNameAction!.payload).toEqual(fakeUser.email);
    });
    
    it('should call "saveToken" once with the received token', async () => {
      const fakeUser: AuthData = { email: 'test@test.ru', password: '123456' };
      const fakeServerReplay = makeFakeUserData();
      mockAxiosAdapter.onPost(ApiRoute.Login).reply(200, fakeServerReplay);
      const mockSaveToken = vi.spyOn(tokenStorage, 'saveToken');

      await store.dispatch(loginAction(fakeUser));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(fakeServerReplay.token);
    });

  });

  describe('logoutAction', () => {
    it('should dispatch "logoutAction.pending", "logoutAction.fulfilled" when server response 204', async() => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);

      await store.dispatch(logoutAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logoutAction.pending.type,
        logoutAction.fulfilled.type,
      ]);
    });

    it('should one call "dropToken" with "logoutAction"', async () => {
      mockAxiosAdapter.onDelete(ApiRoute.Logout).reply(204);
      const mockDropToken = vi.spyOn(tokenStorage, 'dropToken');

      await store.dispatch(logoutAction());

      expect(mockDropToken).toBeCalledTimes(1);
    });
  });

  describe('fetchOffersAction', () => {
    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.fulfilled", when server response 200', async() => {
      const mockOffers = [makeFakeOffer()];
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(200, mockOffers);

      await store.dispatch(fetchOffersAction());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOffersActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOffersAction.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.fulfilled.type,
      ]);

      expect(fetchOffersActionFulfilled.payload)
        .toEqual(mockOffers);
    });

    it('should dispatch "fetchOffersAction.pending", "fetchOffersAction.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Offers).reply(400, []);

      await store.dispatch(fetchOffersAction());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOffersAction.pending.type,
        fetchOffersAction.rejected.type,
      ]);
    });
  });

  describe('getOfferByID', () => {
    it('should dispatch "getOfferByID.pending", "getOfferByID.fulfilled", when server response 200', async() => {
      const mockOffer = makeFakeOfferFull();
      const offerId = 'some-id';
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offerId}`).reply(200, mockOffer);

      await store.dispatch(getOfferByID(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchOfferActionFulfilled = emittedActions.at(1) as ReturnType<typeof getOfferByID.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getOfferByID.pending.type,
        getOfferByID.fulfilled.type,
      ]);

      expect(fetchOfferActionFulfilled.payload)
        .toEqual(mockOffer);
    });

    it('should dispatch "fetchOfferAction.pending", "fetchOfferAction.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(ApiRoute.Offers + offerId).reply(400);

      await store.dispatch(getOfferByID(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getOfferByID.pending.type,
        getOfferByID.rejected.type,
      ]);
    });
  });

  describe('fetchOfferComments', () => {
    it('should dispatch "fetchOfferComments.pending", "fetchOfferComments.fulfilled", when server response 200', async() => {
      const mockReviews = [makeFakeReview()];
      const offerId = 'some-id';
      mockAxiosAdapter.onGet(`${ApiRoute.Comments}/${offerId}`).reply(200, mockReviews);

      await store.dispatch(fetchOfferComments(offerId));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchReviewsActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchOfferComments.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        fetchOfferComments.pending.type,
        fetchOfferComments.fulfilled.type,
      ]);

      expect(fetchReviewsActionFulfilled.payload)
        .toEqual(mockReviews);
    });

    it('should dispatch "fetchReviewsAction.pending", "fetchReviewsAction.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(ApiRoute.Comments + offerId).reply(400, []);

      await store.dispatch(fetchOfferComments(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchOfferComments.pending.type,
        fetchOfferComments.rejected.type,
      ]);
    });
  });

  describe('fetchNearbyOffers', () => {
    it('should dispatch "fetchNearbyOffers.pending", "fetchNearbyOffers.fulfilled", when server response 200', async() => {
      const mockNearBy = Array<Offers>(12).fill(makeFakeOffer());
      const offerId = 'some-id';
      
      mockAxiosAdapter.onGet(`${ApiRoute.Offers}/${offerId}/nearby`).reply(200, mockNearBy);
    
      await store.dispatch(fetchNearbyOffers(offerId));
    
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      
      const fetchNearByActionFulfilled = emittedActions.at(1) as ReturnType<typeof fetchNearbyOffers.fulfilled>;
    
      expect(extractedActionsTypes).toEqual([
        fetchNearbyOffers.pending.type,
        fetchNearbyOffers.fulfilled.type,
      ]);
    
      expect(fetchNearByActionFulfilled.payload)
        .toEqual(mockNearBy);
    });
    

    it('should dispatch "fetchNearbyOffers.pending", "fetchNearbyOffers.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      mockAxiosAdapter.onGet(ApiRoute.Offers + offerId + '/nearby').reply(400, []);

      await store.dispatch(fetchNearbyOffers(offerId));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        fetchNearbyOffers.pending.type,
        fetchNearbyOffers.rejected.type,
      ]);
    });
  });

  describe('loadFavoriteOfferCard', () => {
    it('should dispatch "loadFavoriteOfferCard.pending", "loadFavoriteOfferCard.fulfilled", when server response 200', async() => {
      const mockNearBy = [makeFakeOffer()];
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(200, mockNearBy);

      await store.dispatch(loadFavoriteOfferCard());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteListActionFulfilled = emittedActions.at(1) as ReturnType<typeof loadFavoriteOfferCard.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        loadFavoriteOfferCard.pending.type,
        loadFavoriteOfferCard.fulfilled.type,
      ]);

      expect(fetchFavoriteListActionFulfilled.payload)
        .toEqual(mockNearBy);
    });

    it('should dispatch "loadFavoriteOfferCard.pending", "loadFavoriteOfferCard.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(ApiRoute.Favorite).reply(400, []);

      await store.dispatch(loadFavoriteOfferCard());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        loadFavoriteOfferCard.pending.type,
        loadFavoriteOfferCard.rejected.type,
      ]);
    });
  });

  describe('postOfferComments', () => {
    it('should dispatch "postOfferComments.pending", "postOfferComments.fulfilled", when server response 200', async() => {
      const offerId = 'some-id';
      const fakeReview: PostComment = {
        id: offerId,
        comment: {
          review: 'some text',
          rating: 2,
        },
      };
      const fakeServerReplay = makeFakeReview();

      mockAxiosAdapter.onPost(`${ApiRoute.Comments}/${offerId}`).reply(200, fakeServerReplay);

      await store.dispatch(postOfferComments(fakeReview));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const addReviewActionFulfilled = emittedActions.at(1) as ReturnType<typeof postOfferComments.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postOfferComments.pending.type,
        postOfferComments.fulfilled.type,
      ]);

      expect(addReviewActionFulfilled.payload)
        .toEqual(fakeServerReplay);
    });

    it('should dispatch "postOfferComments.pending", "postOfferComments.rejected" when server response 400', async () => {
      const offerId = 'some-offer-id';
      const fakeReview: PostComment = {
        id: offerId,
        comment: {
          review: 'some txt',
          rating: 2,
        },
      };
      mockAxiosAdapter.onPost(ApiRoute.Comments + offerId).reply(400, []);

      await store.dispatch(postOfferComments(fakeReview));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postOfferComments.pending.type,
        postOfferComments.rejected.type,
      ]);
    });
  });
});