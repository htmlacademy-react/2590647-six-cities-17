import { createAction } from '@reduxjs/toolkit';
import { Offer, City } from '../types/offer';
import { Sort } from '../const';

export const Action = {
  CHANGE_CITY: 'changeCity',
  SAVE_OFFERS: 'saveOffers',
  CHANGE_SORTING: 'changeSorting',
};

export const changeCity = createAction<City>(Action.CHANGE_CITY);

export const saveOffers = createAction<Offer[]>(Action.SAVE_OFFERS);

export const changeSorting = createAction<Sort>(Action.CHANGE_SORTING);

