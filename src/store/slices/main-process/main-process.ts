import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, Cities, Sort } from '../../../const';
import { City } from '../../../types/offer';

type MainState = {
  currentCity: City;
  currentSort: Sort;
  userName: string | null;
}

const initialState: MainState = {
  currentCity: Cities.PARIS,
  currentSort: Sort.Popular,
  userName: localStorage.getItem('userName'),
};

export const mainProcess = createSlice({
  name: NameSpace.Main,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<City>) => {
      state.currentCity = action.payload;
    },
    getSortingStatus: (state, action: PayloadAction<Sort>) => {
      state.currentSort = action.payload;
    },
    saveUserName: (state, action: PayloadAction<string | null>) => {
      state.userName = action.payload;
      if (action.payload) {
        localStorage.setItem('userName', action.payload);
      } else {
        localStorage.removeItem('userName');
      }
    },
  }
});

export const { changeCity, getSortingStatus, saveUserName } = mainProcess.actions;
