import { createRoutine } from 'redux-saga-routines';

export const wordsUpdateRoutine = createRoutine('WORDS_WORDS_DICT');
export const wordsNewUpdateRoutine = createRoutine('WORDS_NEW_DICT');
export const wordsLearnUpdateRoutine = createRoutine('WORDS_LEARN_DICT');
export const wordsKnowUpdateRoutine = createRoutine('WORDS_KNOW_DICT');
export const currentUpdateRoutine = createRoutine('WORDS_CURRENT_DICT');

const defCurrentWords = { newWords: 0, knowWords: 0, learnWords: 0 };

export default (state = { wordsKnow: [], wordsLearn: [], wordsNew: [], currentWords: defCurrentWords }, { type, payload }) => {
  switch (type) {
    case wordsUpdateRoutine.TRIGGER:
      return {
        ...state,
        wordsNew: payload.listNew,
        wordsKnow: payload.listKnow,
        wordsLearn: payload.listLearn
      };
    case wordsNewUpdateRoutine.TRIGGER:
      return {
        ...state,
        wordsNew: payload.words
      };
    case wordsLearnUpdateRoutine.TRIGGER:
      return {
        ...state,
        wordsLearn: payload.words
      };
    case wordsKnowUpdateRoutine.TRIGGER:
      return {
        ...state,
        wordsKnow: payload.words
      };
    case currentUpdateRoutine.TRIGGER:
      return {
        ...state,
        currentWords: payload.currentWords,
      };
    default:
      return state;
  }
};
