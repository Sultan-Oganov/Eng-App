import { createRoutine } from 'redux-saga-routines';

export const userRoutine = createRoutine('USER_ROUTINE');
export const userDataRoutine = createRoutine('USER_DATA_ROUTINE');
export const emailRoutine = createRoutine('USER_EMAIL_ROUTINE');
export const userEndLoading = createRoutine('USER_END_LOADING');

export default (state = { user: null, isAuth: false, isLoading: true }, { type, payload }) => {
  switch (type) {
    case userRoutine.TRIGGER:
      return {
        ...state,
        user: payload.user,
        isAuth: Boolean(payload.user),
        isLoading: false,
        email: ''
      };
    case userDataRoutine.TRIGGER:
      return {
        ...state,
        user: payload.user
      };
    case emailRoutine.TRIGGER:
      return {
        ...state,
        email: payload.email
      };
    case userEndLoading.TRIGGER:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
};
