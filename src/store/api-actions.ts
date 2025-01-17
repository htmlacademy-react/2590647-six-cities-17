import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { ApiRoute } from '../const';
import { Offers, Offer } from '../types/offer';
import { UserComment, PostComment } from '../types/comment';
import { AuthData } from '../types/auth';
import { UserData } from '../types/user';
import { dropToken, saveToken } from '../services/token';
import { saveUserName } from './slices/main-process/main-process';
import { toast } from 'react-toastify';


export const fetchOffersAction = createAsyncThunk<Offers[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers[]>(ApiRoute.Offers);
    return data;
  },
);

export const checkLoginStatus = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkLoginStatus',
  async (_arg, {extra: api}) => {
    await api.get(ApiRoute.Login);
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
    dispatch(saveUserName(email));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {extra: api}) => {
    await api.delete(ApiRoute.Logout);
    dropToken();
  },
);

export const getOfferByID = createAsyncThunk<Offer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/getOfferInfo',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer>(`${ApiRoute.Offers}/${id}`);
    return data;
  }
);

export const fetchNearbyOffers = createAsyncThunk<Offers[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offers[]>(`${ApiRoute.Offers}/${id}/nearby`);
    return data;
  },
);

export const fetchOfferComments = createAsyncThunk<UserComment[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOfferComments',
  async (id, {extra: api}) => {
    const {data} = await api.get<UserComment[]>(`${ApiRoute.Comments}/${id}`);
    return data;
  },
);

export const postOfferComments = createAsyncThunk<UserComment, PostComment, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/postOfferComments',
  async ({id, comment}, {extra: api}) => {
    const {data} = await api.post<UserComment>(`${ApiRoute.Comments}/${id}`, {comment: comment.review, rating: comment.rating});
    return data;
  }
);

export const loadFavoriteOfferCard = createAsyncThunk<Offers[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/loadFavoriteOfferCard',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offers[]>(`${ApiRoute.Favorite}`);
    return data;
  }
);

export const uploadFavoriteStatus = createAsyncThunk<Offers, {offerId: string, wasFavorite: boolean}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/uploadFavoriteStatus',
  async ({offerId, wasFavorite}, {getState, extra: api}) => {
    const nextFavoriteStatus = Number(!wasFavorite);
    const {data} = await api.post<Offers>(`${ApiRoute.Favorite}/${offerId}/${nextFavoriteStatus}`);
    const {offers} = getState().DATA;
    const currentOfferCard = offers.find((offer) => offer.id === data.id)

    if (!currentOfferCard) {
      toast.warn(`No such offer with given id: ${data.id}`)
    }

    return {...currentOfferCard, isFavorite: data.isFavorite} as Offers;
  }
);