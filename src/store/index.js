import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas/index';
import usersReducer from './userReducer';
import wordsReducer from './wordsReducer';
import statReducer from './statReducer';
import dictReducer from './dictReducer';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  sagaMiddleware
];

const composedEnhancers = compose(
  applyMiddleware(...middlewares)
);

const initialState = {};

const reducers = {
  users: usersReducer,
  words: wordsReducer,
  stat: statReducer,
  dictionary: dictReducer
};

const rootReducer = combineReducers({
  ...reducers
});

export const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers
);

export const sagaAction = data => store.dispatch(data);

sagaMiddleware.run(rootSaga);
