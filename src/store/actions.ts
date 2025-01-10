import { createAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/offer';
import { Sort, LoginStatus } from '../const';

export const Actions = {
  CHANGE_CITY: 'changeCity',
  CHANGE_SORTING: 'changeSorting',
  LOAD_OFFERS: 'loadOffers',
  LOADING_STATUS: 'loadingStatus',
  CHANGE_AUTHORIZATION_STATUS: 'changeAuthorizationStatus',
};

export const changeCity = createAction<City>(Actions.CHANGE_CITY);

export const changeSorting = createAction<Sort>(Actions.CHANGE_SORTING);

export const loadOffers = createAction<Offer[]>(Actions.LOAD_OFFERS);

export const setLoadingStatus = createAction<boolean>(Actions.LOADING_STATUS);

export const changeAuthorizationStatus = createAction<LoginStatus>(Actions.CHANGE_AUTHORIZATION_STATUS);

