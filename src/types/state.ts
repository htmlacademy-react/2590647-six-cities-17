import { store } from '../store/index.ts';
import { LoginStatus } from '../const';

export type UserProcess = {
  authorizationStatus: keyof typeof LoginStatus;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
