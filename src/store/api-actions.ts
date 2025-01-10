import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { ApiRoute, LoginStatus } from '../const';
import {
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
import { Offers, Offer } from '../types/offer';
import { UserComment, PostComment } from '../types/comment';
import { AuthData } from '../types/auth';
import { UserData } from '../types/user';
import { dropToken, saveToken } from '../services/token';


export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setLoadingOffersStatus(true));
    const {data} = await api.get<Offers[]>(ApiRoute.Offers);
    dispatch(setLoadingOffersStatus(false));
    dispatch(loadOffers(data));
  },
);

export const checkLoginStatus = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkLoginStatus',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(ApiRoute.Login);
      dispatch(changeAuthorizationStatus(LoginStatus.Auth));
    } catch {
      dispatch(changeAuthorizationStatus(LoginStatus.NoAuth));
    }
  },
);

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserData>(ApiRoute.Login, {email, password});
    saveToken(token);
    dispatch(changeAuthorizationStatus(LoginStatus.Auth));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
    dispatch(changeAuthorizationStatus(LoginStatus.NoAuth));
  },
);

export const getOfferByID = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/getOfferInfo',
  async (id, { dispatch, extra: api }) => {
    try {
      dispatch(setLoadingOfferStatus(true));
      const { data } = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);
      dispatch(setLoadingOfferStatus(false));
      dispatch(loadOffer(data));
    } catch (error) {
      dispatch(setLoadingOfferStatus(false));
    }
  }
);

export const fetchNearbyOffers = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchNearbyOffers',
  async (id, { dispatch, extra: api }) => {
    dispatch(setLoadingNearByOfferStatus(true));
    const {data} = await api.get<Offers[]>(`${ApiRoute.Offers}/${id}/nearby`);
    dispatch(setLoadingNearByOfferStatus(false));
    dispatch(loadNearByOffer(data));
  },
);

export const fetchOfferComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOfferComments',
  async (id, { dispatch, extra: api}) => {
    dispatch(setLoadingCommentsStatus(true));
    const {data} = await api.get<UserComment[]>(`${ApiRoute.Comments}/${id}`);
    dispatch(setLoadingCommentsStatus(false));
    dispatch(loadComments(data));
  },
);

export const postOfferComments = createAsyncThunk<UserComment[], PostComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/postOfferComments',
  async ({id, comment}, { dispatch, extra: api }) => {
    dispatch(setPostCommentLoading(true));
    const {data} = await api.post<UserComment[]>(`${ApiRoute.Comments}/${id}`, {comment: comment.review, rating: comment.rating});
    dispatch(setPostCommentLoading(false));
    return data;
  }
);
