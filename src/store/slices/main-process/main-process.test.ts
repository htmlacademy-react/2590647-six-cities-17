import { describe, it, expect } from 'vitest';
import { mainProcess, changeCity, getSortingStatus, saveUserName } from './main-process';
import { Cities, Sort } from '../../../const';

describe('mainProcess Slice', () => {
  const initialState = {
    currentCity: Cities.PARIS,
    currentSort: Sort.Popular,
    userName: null,
  };

  it('should return the initial state with an empty action', () => {
    const emptyAction = { type: '' };

    const result = mainProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(initialState);
  });

  it('should change current city with "changeCity" action', () => {
    const newCity = Cities.AMSTERDAM;
    const action = changeCity(newCity);
    const expectedState = { ...initialState, currentCity: newCity };

    const result = mainProcess.reducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('should change current sort with "getSortingStatus" action', () => {
    const newSort = Sort.PriceLow;
    const action = getSortingStatus(newSort);
    const expectedState = { ...initialState, currentSort: newSort };

    const result = mainProcess.reducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('should save user name with "saveUserName" action', () => {
    const userName = 'John Doe';
    const action = saveUserName(userName);
    const expectedState = { ...initialState, userName };

    const result = mainProcess.reducer(initialState, action);

    expect(result).toEqual(expectedState);
  });

  it('should reset user name with "saveUserName" action and null payload', () => {
    const action = saveUserName(null);
    const expectedState = { ...initialState, userName: null };

    const result = mainProcess.reducer({ ...initialState, userName: 'Jane Doe' }, action);

    expect(result).toEqual(expectedState);
  });
});
