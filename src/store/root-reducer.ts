import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { authorizationSlice } from './slices/authorization/authorization';
import { offersData } from './slices/offer-data/offer-data';
import { mainProcess } from './slices/main-process/main-process';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.Main]: mainProcess.reducer,
  [NameSpace.User]: authorizationSlice.reducer,
});
