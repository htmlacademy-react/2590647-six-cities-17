import {LoginStatus} from '../../../const';
import {makeFakeUserData} from '../../../mocks';
import {UserProcess} from '../../../types/state';
import {checkLoginStatus, loginAction, logoutAction} from '../../api-actions';
import {authorizationSlice} from './authorization-slice';

describe('UserProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: UserProcess = {
      authorizationStatus: LoginStatus.Unknown,
    };

    const result = authorizationSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: UserProcess = {
      authorizationStatus: LoginStatus.Unknown,
    };

    const result = authorizationSlice.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "checkAuthAction.fulfilled" action', () => {
    const fakeUser = makeFakeUserData();
    const initialState: UserProcess = {
      authorizationStatus: LoginStatus.Unknown,
    };
    const expectedState: UserProcess = {
      authorizationStatus: LoginStatus.Auth,
    };

    const result = authorizationSlice.reducer(initialState, checkLoginStatus.fulfilled(fakeUser, '', undefined));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "checkAuthAction.rejected" action', () => {
    const initialState: UserProcess = {
      authorizationStatus: LoginStatus.Unknown,
    };
    const expectedState: UserProcess = {
      authorizationStatus: LoginStatus.NoAuth,
    };

    const result = authorizationSlice.reducer(initialState, checkLoginStatus.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth" with "loginAction.fulfilled" action', () => {
    const fakeUser = makeFakeUserData();
    const initialState: UserProcess = {
      authorizationStatus: LoginStatus.Unknown,
    };
    const expectedState: UserProcess = {
      authorizationStatus: LoginStatus.Auth,
    };

    const result = authorizationSlice.reducer(initialState, loginAction.fulfilled(fakeUser, '', {
      email: '',
      password: ''
    }));

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth" with "loginAction.rejected" action', () => {
    const initialState: UserProcess = {
      authorizationStatus: LoginStatus.Unknown,
    };
    const expectedState: UserProcess = {
      authorizationStatus: LoginStatus.NoAuth,
    };

    const result = authorizationSlice.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", with "logoutAction.fulfilled" action', () => {
    const initialState: UserProcess = {
      authorizationStatus: LoginStatus.Auth,
    };
    const expectedState: UserProcess = {
      authorizationStatus: LoginStatus.NoAuth,
    };

    const result = authorizationSlice.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
