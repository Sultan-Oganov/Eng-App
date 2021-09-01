import { createRoutine } from 'redux-saga-routines';

export const dataStatRoutine = createRoutine('DATA_STAT_ROUTINE');
export const wordStatRoutine = createRoutine('WORDS_STAT_ROUTINE');
export const countStatRoutine = createRoutine('COUNT_STAT_ROUTINE');
export const statStatRoutine = createRoutine('STAT_STAT_ROUTINE');

const defWordCount = { newWords: 0, learned: 0, toLearn: 0 };

export default (state = { wordCount: defWordCount }, { type, payload }) => {
  switch (type) {
    case dataStatRoutine.TRIGGER:
      return {
        ...state,
        stat: payload.stat, 
        statweek: payload.statweek, 
        statmonth: payload.statmonth, 
        wordStat: payload.wordStat
      };
    case wordStatRoutine.TRIGGER:
      return {
        ...state,
        wordCount: payload.words
      };
    case countStatRoutine.TRIGGER:
      return {
        ...state,
        count: payload.count
      };
    case statStatRoutine.TRIGGER:
      return {
        ...state,
        stat: payload.stat
      };
    default:
      return state;
  }
};
