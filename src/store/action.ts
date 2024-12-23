import { createAction } from "@reduxjs/toolkit";
import { Offer, City } from "../types/offer";

export const Action = {
  CHANGE_CITY: 'changeCity',
  SAVE_OFFERS: 'saveOffers'
};

export const changeCity = createAction<City>(Action.CHANGE_CITY);

export const saveOffers = createAction<Offer[]>(Action.SAVE_OFFERS);