import { createSlice } from '@reduxjs/toolkit';
import { LoginStatus, NameSpace } from '../../../const';
import { UserProcess } from '../../../types/state';
import { checkLoginStatus, loginAction, logoutAction } from '../../api-actions';

export const initialState: UserProcess = {
  authorizationStatus: LoginStatus.Unknown,
};

export const authorizationSlice = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkLoginStatus.fulfilled, (state) => {
        state.authorizationStatus = LoginStatus.Auth;
      })
      .addCase(checkLoginStatus.rejected, (state) => {
        state.authorizationStatus = LoginStatus.NoAuth;
      })
      .addCase(loginAction.fulfilled, (state) => {
        state.authorizationStatus = LoginStatus.Auth;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = LoginStatus.NoAuth;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = LoginStatus.NoAuth;
      });
  }
});
