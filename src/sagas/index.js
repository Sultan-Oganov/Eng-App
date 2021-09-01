import { all } from 'redux-saga/effects';
import usersPageSagas from './userSagas';

export default function* rootSaga() {
  yield all([
    usersPageSagas()
  ]);
}
