import { NameSpace } from '../../../const';
import { State } from '../../../types/state';

export const selectUserName = (state: State) => state[NameSpace.Main].userName;

export const selectCurrentSorting = (state: State) => state[NameSpace.Main].currentSort;

export const selectCurrentCity = (state: State) => state[NameSpace.Main].currentCity;
