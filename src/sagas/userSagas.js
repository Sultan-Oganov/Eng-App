import { put, takeEvery, all, delay } from 'redux-saga/effects';
import { userRoutine } from '../store/userReducer';

// export function* loadUserData(action) {
//   try {
//     const { navigation } = action;
//     const users = defUsers;
//     yield put(setUsersList(users));
//     yield delay(1200);
//     navigation.navigate('Home');
//   } catch (error) {
//     alert(`load start data error : \n ${error.message}`);
//   }
// }

// function* watchUsertData() {
//   yield takeEvery(userRoutine, loadUserData);
// }

export default function* usersPageSagas() {
  yield all([
    // watchUsertData()
  ]);
}
