import { State } from '../../../types/state';
import { LoginStatus } from '../../../const';

export const selectIsAuthorized = (state: State) => state.USER.authorizationStatus === LoginStatus.Auth;
